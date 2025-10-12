import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, profiles, licenses } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const isCompany = formData.get('isCompany') as string === 'true'
    const companyName = formData.get('companyName') as string
    const fullName = formData.get('fullName') as string
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
    const activityType = formData.get('activityType') as string
    const serviceDescription = formData.get('serviceDescription') as string
    const experienceYears = formData.get('experienceYears') as string
    const password = formData.get('password') as string

    // Upload file
    let licenseDocument = ''
    if (licenseDocumentFile) {
      const { url } = await put(licenseDocumentFile.name, licenseDocumentFile, { access: 'public' })
      licenseDocument = url
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
      role: 'intermediary',
    }).returning()

    // Create profile
    await db.insert(profiles).values({
      user_id: user.id,
      organization_name: isCompany ? companyName : fullName,
      contact_info: JSON.stringify({
        email: contactEmail,
        phone: contactPhone,
        registrationNumber,
        taxId,
        isCompany,
        activityType,
        experienceYears: parseInt(experienceYears),
        serviceDescription,
      }),
      address: JSON.stringify({
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      }),
    })

    // Create license
    if (licenseDocument) {
      await db.insert(licenses).values({
        user_id: user.id,
        type: licenseType,
        document_path: licenseDocument,
        expiry_date: new Date(expiryDate),
      })
    }

    return NextResponse.json({
      message: 'Intermediary registration successful',
      userId: user.id,
      status: 'pending_verification'
    })

  } catch (error) {
    console.error('Intermediary registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}