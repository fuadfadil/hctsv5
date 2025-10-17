import { CommissionCalculator } from './commission-calculator';

export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  transactionId: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  gatewayTransactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  gatewayResponse?: any;
  error?: string;
}

export interface GatewayConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  webhookUrl?: string;
}

export abstract class PaymentGateway {
  protected config: GatewayConfig;

  constructor(config: GatewayConfig = {}) {
    this.config = config;
  }

  abstract initiatePayment(data: PaymentData): Promise<PaymentResponse>;
  abstract processPayment(transactionId: string, paymentData: any): Promise<PaymentResponse>;
  abstract checkStatus(transactionId: string): Promise<PaymentResponse>;
  abstract handleWebhook(data: any): Promise<PaymentResponse>;

  protected calculateCommission(amount: number): number {
    return CommissionCalculator.calculateCommission(amount);
  }
}

// Mock OnePay Gateway Implementation
export class OnePayGateway extends PaymentGateway {
  async initiatePayment(data: PaymentData): Promise<PaymentResponse> {
    // Simulate API call to OnePay
    const commission = this.calculateCommission(data.amount);
    const netAmount = data.amount - commission;

    // Mock successful initiation
    return {
      success: true,
      transactionId: data.transactionId,
      gatewayTransactionId: `onepay_${Date.now()}`,
      status: 'pending',
      gatewayResponse: {
        paymentUrl: `https://onepay.ly/pay/${data.transactionId}`,
        commission,
        netAmount
      }
    };
  }

  async processPayment(transactionId: string, paymentData: any): Promise<PaymentResponse> {
    // Simulate payment processing
    return {
      success: true,
      transactionId,
      gatewayTransactionId: `onepay_${Date.now()}`,
      status: 'completed',
      gatewayResponse: {
        processed: true,
        timestamp: new Date().toISOString()
      }
    };
  }

  async checkStatus(transactionId: string): Promise<PaymentResponse> {
    // Simulate status check
    return {
      success: true,
      transactionId,
      status: 'completed',
      gatewayResponse: {
        status: 'completed',
        lastChecked: new Date().toISOString()
      }
    };
  }

  async handleWebhook(data: any): Promise<PaymentResponse> {
    // Simulate webhook handling
    return {
      success: true,
      transactionId: data.transactionId,
      status: 'completed',
      gatewayResponse: data
    };
  }
}

// Mock LyPay Gateway Implementation
export class LyPayGateway extends PaymentGateway {
  async initiatePayment(data: PaymentData): Promise<PaymentResponse> {
    const commission = this.calculateCommission(data.amount);
    const netAmount = data.amount - commission;

    return {
      success: true,
      transactionId: data.transactionId,
      gatewayTransactionId: `lypay_${Date.now()}`,
      status: 'pending',
      gatewayResponse: {
        paymentUrl: `https://lypay.ly/pay/${data.transactionId}`,
        commission,
        netAmount
      }
    };
  }

  async processPayment(transactionId: string, paymentData: any): Promise<PaymentResponse> {
    return {
      success: true,
      transactionId,
      gatewayTransactionId: `lypay_${Date.now()}`,
      status: 'completed',
      gatewayResponse: {
        processed: true,
        timestamp: new Date().toISOString()
      }
    };
  }

  async checkStatus(transactionId: string): Promise<PaymentResponse> {
    return {
      success: true,
      transactionId,
      status: 'completed',
      gatewayResponse: {
        status: 'completed',
        lastChecked: new Date().toISOString()
      }
    };
  }

  async handleWebhook(data: any): Promise<PaymentResponse> {
    return {
      success: true,
      transactionId: data.transactionId,
      status: 'completed',
      gatewayResponse: data
    };
  }
}

// Mock Credit Card Gateway
export class CreditCardGateway extends PaymentGateway {
  async initiatePayment(data: PaymentData): Promise<PaymentResponse> {
    const commission = this.calculateCommission(data.amount);
    const netAmount = data.amount - commission;

    return {
      success: true,
      transactionId: data.transactionId,
      gatewayTransactionId: `cc_${Date.now()}`,
      status: 'pending',
      gatewayResponse: {
        requiresCardDetails: true,
        commission,
        netAmount
      }
    };
  }

  async processPayment(transactionId: string, paymentData: any): Promise<PaymentResponse> {
    // Validate card details (mock)
    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
      return {
        success: false,
        transactionId,
        status: 'failed',
        error: 'Invalid card details'
      };
    }

    return {
      success: true,
      transactionId,
      gatewayTransactionId: `cc_${Date.now()}`,
      status: 'completed',
      gatewayResponse: {
        processed: true,
        timestamp: new Date().toISOString()
      }
    };
  }

  async checkStatus(transactionId: string): Promise<PaymentResponse> {
    return {
      success: true,
      transactionId,
      status: 'completed',
      gatewayResponse: {
        status: 'completed',
        lastChecked: new Date().toISOString()
      }
    };
  }

  async handleWebhook(data: any): Promise<PaymentResponse> {
    return {
      success: true,
      transactionId: data.transactionId,
      status: 'completed',
      gatewayResponse: data
    };
  }
}

// Mock Bank Transfer Gateway
export class BankTransferGateway extends PaymentGateway {
  async initiatePayment(data: PaymentData): Promise<PaymentResponse> {
    const commission = this.calculateCommission(data.amount);
    const netAmount = data.amount - commission;

    return {
      success: true,
      transactionId: data.transactionId,
      gatewayTransactionId: `bt_${Date.now()}`,
      status: 'pending',
      gatewayResponse: {
        bankDetails: {
          accountNumber: '1234567890',
          bankName: 'Libyan Central Bank',
          swiftCode: 'LYCB001'
        },
        commission,
        netAmount
      }
    };
  }

  async processPayment(transactionId: string, paymentData: any): Promise<PaymentResponse> {
    // Bank transfers are manual, so status remains pending until confirmed
    return {
      success: true,
      transactionId,
      status: 'pending',
      gatewayResponse: {
        awaitingConfirmation: true,
        timestamp: new Date().toISOString()
      }
    };
  }

  async checkStatus(transactionId: string): Promise<PaymentResponse> {
    return {
      success: true,
      transactionId,
      status: 'pending',
      gatewayResponse: {
        status: 'pending',
        lastChecked: new Date().toISOString()
      }
    };
  }

  async handleWebhook(data: any): Promise<PaymentResponse> {
    return {
      success: true,
      transactionId: data.transactionId,
      status: 'completed',
      gatewayResponse: data
    };
  }
}

// Masart Payment Gateway Implementation
export class MasartGateway extends PaymentGateway {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;

  constructor(config: GatewayConfig = {}) {
    super(config);
    this.baseUrl = config.baseUrl || process.env.MASART_BASE_URL || 'https://api.masart.ly/v1';
    this.apiKey = config.apiKey || process.env.MASART_API_KEY || '';
    this.apiSecret = config.apiSecret || process.env.MASART_API_SECRET || '';

    if (!this.apiKey || !this.apiSecret) {
      throw new Error('Masart API credentials not configured');
    }
  }

  async initiatePayment(data: PaymentData): Promise<PaymentResponse> {
    try {
      const commission = this.calculateCommission(data.amount);
      const netAmount = data.amount - commission;

      const payload = {
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        customer_email: data.customerEmail,
        customer_name: data.customerName,
        transaction_id: data.transactionId,
        commission_amount: commission,
        net_amount: netAmount,
        webhook_url: this.config.webhookUrl || `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      };

      const response = await fetch(`${this.baseUrl}/payments/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Secret': this.apiSecret,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          transactionId: data.transactionId,
          status: 'failed',
          error: errorData.message || 'Masart API error',
        };
      }

      const result = await response.json();

      return {
        success: true,
        transactionId: data.transactionId,
        gatewayTransactionId: result.payment_id,
        status: 'pending',
        gatewayResponse: {
          paymentUrl: result.payment_url,
          commission,
          netAmount,
          masart_payment_id: result.payment_id,
          expires_at: result.expires_at,
        },
      };
    } catch (error) {
      console.error('Masart initiate payment error:', error);
      return {
        success: false,
        transactionId: data.transactionId,
        status: 'failed',
        error: 'Network error during payment initiation',
      };
    }
  }

  async processPayment(transactionId: string, paymentData: any): Promise<PaymentResponse> {
    try {
      // For Masart, processing is typically handled via redirect or webhook
      // This method can be used for manual confirmation or additional processing
      const response = await fetch(`${this.baseUrl}/payments/${transactionId}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Secret': this.apiSecret,
        },
        body: JSON.stringify(paymentData || {}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          transactionId,
          status: 'failed',
          error: errorData.message || 'Processing failed',
        };
      }

      const result = await response.json();

      return {
        success: true,
        transactionId,
        gatewayTransactionId: result.payment_id,
        status: result.status === 'completed' ? 'completed' : 'pending',
        gatewayResponse: result,
      };
    } catch (error) {
      console.error('Masart process payment error:', error);
      return {
        success: false,
        transactionId,
        status: 'failed',
        error: 'Network error during payment processing',
      };
    }
  }

  async checkStatus(transactionId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${transactionId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Secret': this.apiSecret,
        },
      });

      if (!response.ok) {
        return {
          success: false,
          transactionId,
          status: 'failed',
          error: 'Failed to check payment status',
        };
      }

      const result = await response.json();

      return {
        success: true,
        transactionId,
        status: result.status,
        gatewayResponse: {
          status: result.status,
          lastChecked: new Date().toISOString(),
          ...result,
        },
      };
    } catch (error) {
      console.error('Masart check status error:', error);
      return {
        success: false,
        transactionId,
        status: 'failed',
        error: 'Network error during status check',
      };
    }
  }

  async handleWebhook(data: any): Promise<PaymentResponse> {
    try {
      // Verify webhook signature (implement based on Masart documentation)
      const signature = data.signature;
      const expectedSignature = this.generateWebhookSignature(data);

      if (signature !== expectedSignature) {
        return {
          success: false,
          transactionId: data.transaction_id,
          status: 'failed',
          error: 'Invalid webhook signature',
        };
      }

      // Process webhook data
      const status = data.status; // 'completed', 'failed', 'cancelled', etc.
      const transactionId = data.transaction_id;

      return {
        success: true,
        transactionId,
        status: status === 'success' || status === 'completed' ? 'completed' : 'failed',
        gatewayResponse: data,
      };
    } catch (error) {
      console.error('Masart webhook handling error:', error);
      return {
        success: false,
        transactionId: data.transaction_id || 'unknown',
        status: 'failed',
        error: 'Webhook processing error',
      };
    }
  }

  private generateWebhookSignature(data: any): string {
    // Implement signature verification based on Masart's webhook documentation
    // Using HMAC-SHA256 as is common for webhook verification
    const crypto = require('crypto');
    const payload = JSON.stringify({
      transaction_id: data.transaction_id,
      status: data.status,
      amount: data.amount,
      timestamp: data.timestamp,
    });
    const secret = process.env.MASART_WEBHOOK_SECRET || this.apiSecret;
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }
}

// Factory function to create gateway instances
export function createPaymentGateway(method: string, config: GatewayConfig = {}): PaymentGateway {
  switch (method) {
    case 'masart':
      return new MasartGateway(config);
    case 'onepay':
      return new OnePayGateway(config);
    case 'lypay':
      return new LyPayGateway(config);
    case 'credit_card':
      return new CreditCardGateway(config);
    case 'bank_transfer':
      return new BankTransferGateway(config);
    default:
      throw new Error(`Unsupported payment method: ${method}`);
  }
}