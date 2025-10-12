import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, profiles, licenses, guarantors, services } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const organizationName = formData.get('organizationName') as string
    const registrationNumber = formData.get('registrationNumber') as string
    const taxId = formData.get('taxId') as string
    const contactEmail = formData.get('contactEmail') as string
    const contactPhone = formData.get('contactPhone') as string
    const address = JSON.parse(formData.get('address') as string)
    const licenseNumber = formData.get('licenseNumber') as string
    const licenseType = formData.get('licenseType') as string
    const issuingAuthority = formData.get('issuingAuthority') as string
    const expiryDate = formData.get('expiryDate') as string
    const licenseDocumentFile = formData.get('licenseDocument') as File | null
    const guarantorName = formData.get('guarantorName') as string
    const guarantorEmail = formData.get('guarantorEmail') as string
    const guarantorPhone = formData.get('guarantorPhone') as string
    const guaranteeAmount = formData.get('guaranteeAmount') as string
    const guarantorDocumentFile = formData.get('guarantorDocument') as File | null
    const icd11Codes = JSON.parse(formData.get('icd11Codes') as string)
    const specialties = formData.get('specialties') as string
    const serviceDescription = formData.get('serviceDescription') as string
    const password = formData.get('password') as string

    // Upload files
    let licenseDocument = ''
    if (licenseDocumentFile) {
      const { url } = await put(licenseDocumentFile.name, licenseDocumentFile, { access: 'public' })
      licenseDocument = url
    }

    let guarantorDocument = ''
    if (guarantorDocumentFile) {
      const { url } = await put(guarantorDocumentFile.name, guarantorDocumentFile, { access: 'public' })
      guarantorDocument = url
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, contactEmail)).limit(1)
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Validate password
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const [user] = await db.insert(users).values({
      email: contactEmail,
      password_hash: hashedPassword,
      role: 'provider',
    }).returning()

    // Create profile
    await db.insert(profiles).values({
      user_id: user.id,
      organization_name: organizationName,
      contact_info: {
        email: contactEmail,
        phone: contactPhone,
        registrationNumber,
        taxId,
      },
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      },
    })

    // Create license
    if (licenseDocument) {
      await db.insert(licenses).values({
        user_id: user.id,
        type: licenseType,
        document_path: licenseDocument, // In real app, this would be uploaded to cloud storage
        expiry_date: new Date(expiryDate),
      })
    }

    // Create guarantor
    if (guarantorName) {
      await db.insert(guarantors).values({
        provider_id: user.id,
        name: guarantorName,
        contact_info: JSON.stringify({
          email: guarantorEmail,
          phone: guarantorPhone,
        }),
        guarantee_amount: guaranteeAmount.toString(),
      })
    }

    // Create services based on ICD11 codes
    if (icd11Codes && Array.isArray(icd11Codes)) {
      for (const code of icd11Codes) {
        await db.insert(services).values({
          provider_id: user.id,
          name: `${organizationName} - ${code}`,
          description: serviceDescription,
          icd11_code: code,
          base_price: '0', // Default price, can be updated later
        })
      }
    }

    return NextResponse.json({
      message: 'Provider registration successful',
      userId: user.id,
      status: 'pending_verification'
    })

  } catch (error) {
    console.error('Provider registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}