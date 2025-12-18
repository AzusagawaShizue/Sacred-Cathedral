import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const ip = req.ips?.length ? req.ips[0] : req.ip;
    const deviceId = req.headers['x-device-id'] || 'unknown';
    
    // Combine IP and Device ID for tracking
    return `${ip}-${deviceId}`;
  }

  protected errorMessage = 'Rate limit exceeded. Please slow down your prayers.';
}
