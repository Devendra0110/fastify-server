
import axios from 'axios';
import { Env } from '../../../configure-environment';
import { IENVCONFIG } from 'interface/config.interface';
import { CommonDbService, NotificationDbService, ClientDbService } from 'p3l_core';
import { IClientSchema } from 'p3l_core/dist/interface/Client.interface';
import { INotification } from 'p3l_core/dist/interface/Notification.interface';

import { AzureQueryParams, AzureUserListResponse, IUser, searchQueryParams, UserSchema } from 'p3l_core/dist/interface/User.interface';
export class UserService {

    public commonDbService = new CommonDbService;
    public notificationDbService = new NotificationDbService;
    public clientDbService = new ClientDbService;
    config:any;

    constructor(){
        this.config = Env.Instance.Config as IENVCONFIG;

    }

    /**
    * Method to add new user in database.
    * @since    0.0.1
    * @access   public
    * @author   Nalin Mathur
    * @param    {UserSchema} user
    * @memberof UserService
    * @returns {Promise}
    */
    public async addUser(user: UserSchema, userRole: string): Promise<UserSchema> {
        const response = await this.commonDbService.addUser(user, userRole);
        return response;
    }
    /**
    * Login by using email.
    * @since    0.0.1
    * @access   public
    * @author   Nalin Mathur
    * @param    {string} email
    * @memberof UserService
    * @returns {Promise<IUser>}
    */
    public async login(email: string): Promise<UserSchema> {
        const response = await this.commonDbService.login(email);
        return response;
    }
    /** method to update a single user
    * @since    0.0.1
    * @access   public
    * @author   Somiyan Guchait
    * @param    {UserSchema} userObj
    * @memberof UserService
    * @returns {Promise}
    */
    public async updateUser(user: UserSchema, userRole: string): Promise<UserSchema> {
        const response = await this.commonDbService.updateUser(user, userRole);
        return response;
    }
    /**
    * Retrieve user from AzureAD.
    * @since    0.0.1
    * @access   public
    * @author   Nalin Mathur
    * @param    {string} accessToken
    * @param    {AzureQueryParams} queryParams
    * @memberof UserService
    * @returns {Promise}
    */
    public async getUsers(accessToken: string, queryParams: AzureQueryParams): Promise<AzureUserListResponse> {
        const response = await this.commonDbService.getUsersFromAzureAD(accessToken, queryParams);
        return response;
    }

    /**
    * Retrieve user from database with searchParams.
    * @since    0.0.2
    * @access   public
    * @author   Sajid Ali shah
    * @memberof UserService
    * @returns {Promise}
    */
    public async getUserlistFromDB(queryParams: searchQueryParams): Promise<any[]> {
        return await this.commonDbService.getUsersFromDB(queryParams);
    }
    /**
    * Set User Verification.
    * @since    0.0.2
    * @access   public
    * @author   Rahul Sahu
    * @memberof UserService
    * @returns {Promise}
    */
    public async setUserVerification(id: string): Promise<any[]> {
        try {
            return await this.commonDbService.setUserVerification(id);

        } catch (error) {

            console.log(error);
        }
    }

    /**
    * Retrieve user from database with searchParams.
    * @since    0.0.2
    * @access   public
    * @author   Sajid Ali shah
    * @memberof UserService
    * @returns {Promise}
    */
    public async addNotification(queryParams: any): Promise<INotification> {
        return await this.notificationDbService.addNotification(queryParams);
    }

    /**
    * Retrieve user from database with searchParams.
    * @since    0.0.2
    * @access   public
    * @author   Sajid Ali shah
    * @memberof UserService
    * @returns {Promise}
    */
    public async updateUsersInAzureDB(token: string, email: string): Promise<IUser> {
        return await this.commonDbService.updateUserInAzureDB(email, token);
    }

    /**
    * Retrieve user from database with searchParams.
    * @since    0.0.2
    * @access   public
    * @author   Sajid Ali shah
    * @memberof UserService
    * @returns {Promise}
    */
    public async getNotification(id: string): Promise<any[]> {
        return await this.notificationDbService.getNotificationList(id);
    }

    
    /**
    * Retrieve user from database with searchParams.
    * @since    0.0.2
    * @access   public
    * @author   Sajid Ali shah
    * @memberof UserService
    * @returns {Promise}
    */
     public async getUserLocation(lat: number,long:number): Promise<any[]> {
const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${this.config.OPEN_WEATHER_API_KEY}&units=imperial`)
return response.data;    

}
    /**
    * Get user.
    * @since    0.0.2
    * @access   public
    * @author   Rahul Sahu
    * @memberof UserService
    * @returns {Promise}
    */
    public async getUser(user: UserSchema): Promise<any[]> {
        return await this.commonDbService.getUser(user);
    }

    /**
    * Save Client Name 
    * @since    0.0.2
    * @access   public
    * @author   Rahul Sahu
    * @memberof UserService
    * @returns {Promise}
    */
    public async saveClientNames(queryParams: IClientSchema): Promise<any> {
        return await this.clientDbService.saveClientNames(queryParams);
    }
    /**
    * Retrieve clientName from database.
    * @since    0.0.2
    * @access   public
    * @author   Sajid Ali shah
    * @memberof UserService
    * @returns {Promise}
    */
    public async getClientList(): Promise<any[]> {
        return await this.clientDbService.getClientList();
    }
    /**
    * Updating Notification.
    * @since    0.0.2
    * @access   public
    * @author   Somiyan Guchait
    * @memberof UserService
    * @returns {Promise}
    */
    public async updateNotification(notificationId: string, userId: string): Promise<INotification[]> {
        return await this.notificationDbService.updateNotification(notificationId, userId);
    }
}
