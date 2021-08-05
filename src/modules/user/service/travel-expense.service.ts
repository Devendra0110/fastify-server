
import { ExpenseDbService } from 'p3l_core';
import { IExpense } from 'p3l_core/dist/interface/Expense.interface';
export class TravelAndExpenseService {
    public expenseDbService = new ExpenseDbService;
    public async addExpense(expense: any): Promise<any> {
        try {
            const response = await this.expenseDbService.addExpense(expense)
            return response;
        } catch (error) {
            console.log(error);
        }

    }
    public async getExpense(): Promise<any[]> {
        return await this.expenseDbService.getExpense()
    }

    public async getExpensesByProjectId(id: string): Promise<any[]> {
        try {
            return await this.expenseDbService.getExpensesByProjectId(id);

        } catch (error) {

            console.log(error);
        }
    }



}
