import { toast } from "sonner"

export type ErrorType = 'network' | 'validation' | 'server' | 'authentication' | 'authorization' | 'payment' | 'certificate' | 'service' | 'general'

export interface ErrorToastOptions {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

export interface HealthcareErrorContext {
  patientId?: string
  serviceId?: string
  providerId?: string
  certificateId?: string
  transactionId?: string
  operation?: string
}

// Healthcare-specific error messages and recovery suggestions
const HEALTHCARE_ERROR_MESSAGES = {
  network: {
    title: "Connection Error",
    description: "Unable to connect to healthcare services. Please check your internet connection.",
    recovery: "Try refreshing the page or check your network settings."
  },
  validation: {
    title: "Invalid Information",
    description: "The provided information doesn't meet healthcare standards.",
    recovery: "Please review and correct the highlighted fields."
  },
  server: {
    title: "Server Error",
    description: "Healthcare system is temporarily unavailable.",
    recovery: "Please try again in a few minutes. If the problem persists, contact support."
  },
  authentication: {
    title: "Authentication Required",
    description: "Please sign in to access healthcare services.",
    recovery: "Sign in with your healthcare provider credentials."
  },
  authorization: {
    title: "Access Denied",
    description: "You don't have permission to access this healthcare resource.",
    recovery: "Contact your administrator or verify your role permissions."
  },
  payment: {
    title: "Payment Error",
    description: "Unable to process healthcare payment.",
    recovery: "Check your payment method or contact billing support."
  },
  certificate: {
    title: "Certificate Error",
    description: "Issue with healthcare certificate generation or verification.",
    recovery: "Try regenerating the certificate or contact certificate authority."
  },
  service: {
    title: "Service Unavailable",
    description: "The requested healthcare service is currently unavailable.",
    recovery: "Try again later or select an alternative service."
  },
  general: {
    title: "Error",
    description: "An unexpected error occurred in the healthcare system.",
    recovery: "Please try again or contact technical support."
  }
}

export class HealthcareToast {
  static error(
    type: ErrorType,
    options: ErrorToastOptions = {},
    context?: HealthcareErrorContext
  ) {
    const errorConfig = HEALTHCARE_ERROR_MESSAGES[type]
    const title = options.title || errorConfig.title
    const description = options.description || `${errorConfig.description}${context ? ` (${context.operation || 'Operation'})` : ''}`

    toast.error(title, {
      description,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : {
        label: "Learn More",
        onClick: () => toast.info("Recovery Suggestion", {
          description: errorConfig.recovery,
          duration: 5000,
        }),
      },
      duration: options.duration || 5000,
    })
  }

  static success(message: string, options: ErrorToastOptions = {}) {
    toast.success(message, {
      description: options.description,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      duration: options.duration || 3000,
    })
  }

  static warning(message: string, options: ErrorToastOptions = {}) {
    toast.warning(message, {
      description: options.description,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      duration: options.duration || 4000,
    })
  }

  static info(message: string, options: ErrorToastOptions = {}) {
    toast.info(message, {
      description: options.description,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      duration: options.duration || 3000,
    })
  }

  // Specialized healthcare error toasts
  static networkError(context?: HealthcareErrorContext) {
    this.error('network', {}, context)
  }

  static validationError(fields?: string[], context?: HealthcareErrorContext) {
    const description = fields
      ? `Please check the following fields: ${fields.join(', ')}`
      : HEALTHCARE_ERROR_MESSAGES.validation.description

    this.error('validation', { description }, context)
  }

  static serverError(operation?: string, context?: HealthcareErrorContext) {
    this.error('server', {}, { ...context, operation })
  }

  static authError(context?: HealthcareErrorContext) {
    this.error('authentication', {}, context)
  }

  static paymentError(amount?: string, context?: HealthcareErrorContext) {
    const description = amount
      ? `Unable to process payment of ${amount}.`
      : HEALTHCARE_ERROR_MESSAGES.payment.description

    this.error('payment', { description }, context)
  }

  static certificateError(action: 'generate' | 'verify' | 'download', context?: HealthcareErrorContext) {
    const descriptions = {
      generate: "Failed to generate healthcare certificate.",
      verify: "Certificate verification failed.",
      download: "Unable to download certificate."
    }

    this.error('certificate', {
      description: descriptions[action],
      action: {
        label: "Retry",
        onClick: () => {
          // This would typically trigger a retry action
          toast.info("Retrying operation...", { duration: 2000 })
        }
      }
    }, context)
  }

  static serviceUnavailable(serviceName?: string, context?: HealthcareErrorContext) {
    const description = serviceName
      ? `${serviceName} service is currently unavailable.`
      : HEALTHCARE_ERROR_MESSAGES.service.description

    this.error('service', { description }, context)
  }

  // Masart-specific payment toasts
  static masartPaymentSuccess(amount: string, context?: HealthcareErrorContext) {
    this.success("Payment completed with Masart", {
      description: `Successfully processed payment of ${amount} for transaction #${context?.transactionId} via Masart gateway.`,
    })
  }

  static masartPaymentPending(amount: string, context?: HealthcareErrorContext) {
    this.info("Payment initiated with Masart", {
      description: `Payment of ${amount} for transaction #${context?.transactionId} is being processed by Masart. You will be notified once completed.`,
    })
  }

  static masartWebhookError(context?: HealthcareErrorContext) {
    this.error('payment', {
      title: "Masart Webhook Error",
      description: "Failed to process payment notification from Masart.",
    }, context)
  }
}

// Export toast function for direct use
export { toast }