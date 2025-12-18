import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { GameService } from './game.service';
import { ThrottlerGuard } from '@nestjs/throttler';

class PrayDto {
  address: string;
}

@ApiTags('game')
@Controller('game')
@UseGuards(ThrottlerGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('pray')
  @ApiOperation({ summary: 'Perform a prayer action' })
  @ApiBody({ type: PrayDto })
  async pray(@Body() body: PrayDto) {
    return this.gameService.pray(body.address);
  }

  @Get('inventory/:address')
  @ApiOperation({ summary: 'Get user temporary inventory' })
  async getInventory(@Param('address') address: string) {
    return this.gameService.getInventory(address);
  }

  @Post('withdraw')
  @ApiOperation({ summary: 'Withdraw all items to wallet' })
  @ApiBody({ type: PrayDto })
  async withdraw(@Body() body: PrayDto) {
    return this.gameService.withdraw(body.address);
  }
}
