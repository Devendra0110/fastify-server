import * as fastify from "fastify";
import { isEmpty } from "lodash";
import { UserService } from "../service/user.service";
import { RedisService } from '../../../services/redis.service';
import Boom from "boom";
import { AzureQueryParams, searchQueryParams, UserSchema } from "p3l_core/dist/interface/User.interface";
import { ErrorMsg, InfoMsg, SuccessMsg } from "./../../../msg/index.msg";
import { INotification } from "p3l_core/dist/interface/Notification.interface";

export class UserController {
    private userService: UserService
    private redisService: RedisService;

    constructor() {
        this.userService = new UserService();
        this.redisService = new RedisService();
    }
    /**
    * Method to add new user in database.
    * @since    0.0.1
    * @access   public
    * @author   Nalin Mathur
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>}     reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async addUser(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any> {
        const email: string = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.ADD_USER);
            const body = request.body.userData;
            const user: UserSchema = await this.redisService.get(server, email);
            const roleIndex = request.raw.user.roleIndex;
            const roleId = user.roles[roleIndex]['_id'];
            // const roleid = user.roles[roleIndex]._id;
            const response = await this.userService.addUser(body, roleId);
            server.log.info({ user: email }, SuccessMsg.ADD_USER);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.ADD_USER);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }
    /**
    * Retrieve user from AzureAD.
    * @since    0.0.1
    * @access   public
    * @author   Nalin Mathur
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>}     reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async getUsers(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any> {
        const email: string = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.GET_USER_LIST);
            const user: UserSchema = await this.redisService.get(server, email);
            const accessToken: string = request.raw.token;
            const queryParams: AzureQueryParams = JSON.parse(request.query.queryParams);
            const response = await this.userService.getUsers(accessToken, queryParams);
            server.log.info({ user: email }, SuccessMsg.GET_USER_LIST);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.GET_USER_LIST);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }

    }

    /**
    * Login by using email.
    * @since    0.0.1
    * @access   public
    * @author   Nalin Mathur
    * @param    {string} email
    * @memberof UserController
    * @returns {Promise<IUser>}
    */
    public async login(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any> {
        const email = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.LOGIN);
            const response = await this.userService.login(email);
            if (isEmpty(response)) {
                throw Boom.forbidden('user not found');
            }
            await this.redisService.set(server, email, JSON.stringify(response));
            server.log.info({ user: email }, SuccessMsg.LOGIN);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.LOGIN);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }

    }
    /** method to update a single user
    * @since    0.0.1
    * @access   public
    * @author   Somiyan Guchait
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>}     reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async updateUser(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any> {
        const email = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.UPDATE_USER);
            const userData = request.body.userData;
            const user: UserSchema = await this.redisService.get(server, email);
            const roleIndex = request.raw.user.roleIndex;
            const roleId = user.roles[roleIndex]['_id'];
            const response = await this.userService.updateUser(userData, roleId);
            await this.redisService.set(server, response.email, JSON.stringify(response));
            server.log.info({ user: email }, SuccessMsg.UPDATE_USER);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.UPDATE_USER);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }
    /**
    * Retrieve user from database.
    * @since    0.0.1
    * @access   public
    * @author   Nalin Mathur
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>}     reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async getUserFromDB(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any> {
        const email = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.GET_USER_BY_EMAIL);
            const response = await this.userService.login(email);
            if (isEmpty(response)) {
                throw Boom.forbidden('user not found');
            }
            await this.redisService.set(server, email, JSON.stringify(response));
            server.log.info({ user: email }, SuccessMsg.GET_USER_BY_EMAIL);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.GET_USER_BY_EMAIL);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }

    }

    /**
    * Retrieve user from database.
    * @since    0.0.1
    * @access   public
    * @author   Nalin Mathur
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>}     reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async updateUsersInAzureDB(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any> {
        const email = request.body.userData.mail;
        const accessToken: string = request.raw.token;
        try {
            server.log.info({ user: email }, InfoMsg.GET_USER_BY_EMAIL);
            const response = await this.userService.updateUsersInAzureDB(email, accessToken);
            if (isEmpty(response)) {
                throw Boom.forbidden('user not found');
            }
            await this.redisService.set(server, email, JSON.stringify(response));
            server.log.info({ user: email }, SuccessMsg.GET_USER_BY_EMAIL);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.GET_USER_BY_EMAIL);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }

    }

    /**
    * Retrieve user from database with search params.
    * @since    0.0.2
    * @access   public
    * @author   sajid ali shah
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>}     reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async getUserListFromDB(server: any, _request: any, reply: fastify.FastifyReply<any>): Promise<any[]> {
        const email = _request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.GET_ALL_USERS);
            const queryParams: searchQueryParams = JSON.parse(_request.query.queryParams);
            const response = await this.userService.getUserlistFromDB(queryParams);
            server.log.info({ user: email }, SuccessMsg.GET_ALL_USERS);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.GET_ALL_USERS);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }
    /**
    * Set  User Verification.
    * @since    0.0.2
    * @access   public
    * @author   Rahul Sahu
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>}     reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async setUserVerification(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any[]> {
        const email = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.SET_USER_VERIFICATION);
            const id = request.body.params.id;
            const response = await this.userService.setUserVerification(id);
            server.log.info({ user: email }, SuccessMsg.SET_USER_VERIFICATION);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.SET_USER_VERIFICATION);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }


    /**
  * Retrieve user from database with search params.
  * @since    0.0.2
  * @access   public
  * @author   sajid ali shah
  * @param    {any}     server
  * @param    {any}     request
  * @param    {fastify.FastifyReply<any>}     reply
  * @memberof UserController
  * @returns {Promise}
  */
    public async addNotification(server: any, email: string, notificationObject: any): Promise<INotification> {
        try {
            server.log.info({ user: email }, InfoMsg.ADD_NOTIFICATION);
            // const queryParams: searchQueryParams = JSON.parse(_request.query.queryParams);
            const response = await this.userService.addNotification(notificationObject);
            server.log.info({ user: email }, SuccessMsg.ADD_NOTIFICATION);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.ADD_NOTIFICATION);
            server.log.error({ user: email }, error.message);
            return (error);
        }
    }



    /**
* Set  User Verification.
* @since    0.0.2
* @access   public
* @author   Rahul Sahu
* @param    {any}     server
* @param    {any}     request
* @param    {fastify.FastifyReply<any>}     reply
* @memberof UserController
* @returns {Promise}
*/
    public async getNotificationByUser(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any[]> {
        const email = request.raw.user.unique_name;
        const user = await this.redisService.get(server, email);

        try {
            server.log.info({ user: email }, InfoMsg.GET_USER_NOTIFICATION);
            const response = await this.userService.getNotification(user._id);
            server.log.info({ user: email }, SuccessMsg.GET_USER_NOTIFICATION);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.GET_USER_NOTIFICATION);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }





    /**
* Set  User Verification.
* @since    0.0.2
* @access   public
* @author   Rahul Sahu
* @param    {any}     server
* @param    {any}     request
* @param    {fastify.FastifyReply<any>}     reply
* @memberof UserController
* @returns {Promise}
*/
public async getUserLocation(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any[]> {
    const email:string = request.raw.user.unique_name;
    const lat: number = request.query.lat;
    const long: number = request.query.long;
    try {
        server.log.info({ user: email }, InfoMsg.GET_USER_LOCATION);
        const response = await this.userService.getUserLocation(lat,long);
        server.log.info({ user: email }, SuccessMsg.GET_USER_LOCATION);
        return response;
    } catch (error) {
        server.log.error({ user: email }, ErrorMsg.GET_USER_LOCATION);
        server.log.error({ user: email }, error.message);
        throw reply.send(error);
    }
}



    /**
* Get User.
* @since    0.0.2
* @access   public
* @author   Rahul Sahu
* @param    {any}     server
* @param    {any}     request
* @param    {fastify.FastifyReply<any>}     reply
* @memberof UserController
* @returns {Promise}
*/

    public async getUser(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<any[]> {
        const email = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.GET_USER);
            const user = request.body.params;
            const response = await this.userService.getUser(user);
            server.log.info({ user: email }, SuccessMsg.GET_USER);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.GET_USER);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }
    /**
    * Save Client name in DB.
    * @since    0.0.2
    * @access   public
    * @author   Rahul Sahu
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>}     reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async saveClientNames(server: any, request, reply: fastify.FastifyReply<any>): Promise<any> {
        const email: string = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.SAVE_CLIENT_NAME);
            const body = request.body.clientName;
            const response = await this.userService.saveClientNames(body);
            server.log.info({ user: email }, SuccessMsg.SAVE_CLIENT_NAME);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.SAVE_CLIENT_NAME);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }
    /**
    * Retrieve ClientName from database .
    * @since    0.0.2
    * @access   public
    * @author   sajid ali shah
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>}     reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async getClientLists(server: any, request, reply: fastify.FastifyReply<any>): Promise<any> {
        const email: string = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.GET_CLIENT_NAME_LIST);
            const response = await this.userService.getClientList();
            server.log.info({ user: email }, SuccessMsg.GET_CLIENT_NAME_LIST);
            return response;
        }
        catch (error) {
            server.log.error({ user: email }, ErrorMsg.GET_CLIENT_NAME_LIST);
            server.log.error({ user: email }, error.message);
            return reply.send(error);
        }
    }
    /**
    * updating read value of notification .
    * @since    0.0.2
    * @access   public
    * @author   Somiyan Guchait
    * @param    {any}     server
    * @param    {any}     request
    * @param    {fastify.FastifyReply<any>} reply
    * @memberof UserController
    * @returns {Promise}
    */
    public async updateNotification(server: any, request: any, reply: fastify.FastifyReply<any>): Promise<INotification[]> {
        const email = request.raw.user.unique_name;
        try {
            server.log.info({ user: email }, InfoMsg.UPDATE_NOTIFICATION);
            const notificationId = request.body.params._id;
            const user: UserSchema = await this.redisService.get(server, email);
            const userId = user["_id"];
            const response = await this.userService.updateNotification(notificationId, userId);
            server.log.info({ user: email }, SuccessMsg.UPDATE_NOTIFICATION);
            return response;
        } catch (error) {
            server.log.error({ user: email }, ErrorMsg.UPDATE_NOTIFICATION);
            server.log.error({ user: email }, error.message);
            return (error);
        }
    }
}