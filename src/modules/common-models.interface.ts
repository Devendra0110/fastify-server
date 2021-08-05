export interface User {
	uid?: string;
	email?: string;
	photoURL?: string;
	displayName?: string;
	myCustomData?: string;
	password?: string;
	role?: string;
	admin_info?: AdminInfo;
	supplier_info?: SupplierInfo;
	object_id?: string;
	supplier?: string;
	membership_expire?: string;
}
export interface AdminInfo {
	password?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	uid?: string;
	userName?: string;
	object_id?: string;
	role?: string;
	supplier?: string;
	userData?: any;
}

export interface SupplierInfo {
	password?: string;
	email?: string;
	uid?: string;
	userName?: string;
	object_id?: string;
	role?: string;
	supplier?: string;
}