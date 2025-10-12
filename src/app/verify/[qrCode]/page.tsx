import { CertificateVerifier } from '@/components/certificates/CertificateVerifier';

interface VerifyPageProps {
  params: Promise<{
    qrCode: string;
  }>;
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { qrCode } = await params;
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Certificate Verification</h1>
        <p className="text-muted-foreground">
          Verify the authenticity of healthcare service certificates
        </p>
      </div>

      <CertificateVerifier />
    </div>
  );
}