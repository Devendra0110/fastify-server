import * as fastify from "fastify";
import { InfoMsg, SuccessMsg, ErrorMsg } from "./../../../msg/index.msg";
import { TravelAndExpenseService } from "../service/travel-expense.service";

export class TravelAndExpenseController {
  private travelAndExpenseService: TravelAndExpenseService;

  constructor() {
    this.travelAndExpenseService = new TravelAndExpenseService();
  }

  public async addExpense(
    server: any,
    request,
    reply: fastify.FastifyReply<any>
  ): Promise<any> {
    const email: string = request.raw.user.unique_name;
    try {
      server.log.info({ user: email }, InfoMsg.ADD_EXPENSE);
      const body = request.body.expense;
      const response = await this.travelAndExpenseService.addExpense(body);
      server.log.info({ user: email }, SuccessMsg.ADD_EXPENSE);
      return response;
    } catch (error) {
      server.log.error({ user: email }, ErrorMsg.ADD_EXPENSE);
      server.log.error({ user: email }, error.message);
      return reply.send(error);
    }
  }

  public async getExpense(
    server: any,
    _request,
    reply: fastify.FastifyReply<any>
  ): Promise<any[]> {
    const email: string = _request.raw.user.unique_name;
    try {
      server.log.info({ user: email }, InfoMsg.GET_ALL_EXPENSE);
      const response = await this.travelAndExpenseService.getExpense();
      server.log.info({ user: email }, SuccessMsg.GET_ALL_EXPENSE);
      return response;
    } catch (error) {
      server.log.error({ user: email }, ErrorMsg.GET_ALL_EXPENSE);
      server.log.error({ user: email }, error.message);
      return reply.send(error);
    }

  }

  public async getExpensesByProjectId(
    server: any,
    _request,
    reply: fastify.FastifyReply<any>
  ): Promise<any[]> {
    const email: string = _request.raw.user.unique_name;
    try {
      server.log.info({ user: email }, InfoMsg.GET_EXPENSE_BY_ID);
      const id = _request.body.id;
      const response = await this.travelAndExpenseService.getExpensesByProjectId(id);
      server.log.info({ user: email }, SuccessMsg.GET_EXPENSE_BY_ID);
      return response;
    } catch (error) {
      server.log.error({ user: email }, ErrorMsg.GET_EXPENSE_BY_ID);
      server.log.error({ user: email }, error.message);
      return reply.send(error);
    }
  }
}
