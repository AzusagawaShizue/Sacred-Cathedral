import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('user')
@Controller('user')
@UseGuards(ThrottlerGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':address')
  @ApiOperation({ summary: 'Get user profile' })
  async getProfile(@Param('address') address: string) {
    return this.userService.getProfile(address);
  }
}
