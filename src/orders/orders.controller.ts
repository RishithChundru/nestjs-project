import {Controller,Post,Get,Body,Param,Req,UseGuards,} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Req() req, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.userId, dto);
  }

  @Get()
  getUserOrders(@Req() req) {
    return this.ordersService.getUserOrders(req.user.userId);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post('admin/update-status/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto,) {
    return this.ordersService.updateStatus(id, dto.status);
  }
  
}
