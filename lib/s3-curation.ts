import { S3Client, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId:
      process.env.AWS_ACCESS_KEY_ID ||
      process.env.AWS_ACCESS_KEY ||
      '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export type DirectPromoteOptions = {
  submissionMediaFilename: string
  deleteSubmissionSource?: boolean
}

/**
 * Copies object directly from S3_SUBMISSION_BUCKET to S3_PUBLIC_BUCKET inside AWS.
 * Zero server-side file buffering. Returns the public CDN / S3 URL.
 */
export async function directPromoteSubmissionToPublic({
  submissionMediaFilename,
  deleteSubmissionSource = true,
}: DirectPromoteOptions): Promise<string> {
  const submissionBucket = process.env.S3_SUBMISSION_BUCKET
  const publicBucket = process.env.S3_PUBLIC_BUCKET || process.env.S3_PENDING_BUCKET
  const region = process.env.AWS_REGION || 'ap-southeast-2'

  if (!submissionBucket || !publicBucket) {
    throw new Error('S3_SUBMISSION_BUCKET atau S3_PUBLIC_BUCKET belum disetel.')
  }

  // 1. Direct copy inside AWS S3 backbone
  await s3.send(
    new CopyObjectCommand({
      Bucket: publicBucket,
      CopySource: encodeURI(`${submissionBucket}/${submissionMediaFilename}`),
      Key: submissionMediaFilename,
    })
  )

  // 2. Delete source object from submission bucket
  if (deleteSubmissionSource) {
    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: submissionBucket,
          Key: submissionMediaFilename,
        })
      )
    } catch (err) {
      console.warn(`[S3_CURATION] Gagal menghapus submission copy: ${err}`)
    }
  }

  // 3. Build public CloudFront / S3 URL
  const rawCdn = process.env.NEXT_PUBLIC_CDN_URL?.trim() || ''
  const cleanCdn = rawCdn.replace(/^https?:\/\//, '').replace(/\/$/, '')
  if (cleanCdn) {
    return `https://${cleanCdn}/${submissionMediaFilename}`
  }
  return `https://${publicBucket}.s3.${region}.amazonaws.com/${submissionMediaFilename}`
}
