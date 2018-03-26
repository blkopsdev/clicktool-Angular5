export class Util {

	setLocalObject(keyname:string, object:Object) {
		let objString = JSON.stringify(object)
		localStorage.setItem(keyname, objString)
	}
	getLocalObject(keyname:string) : Object {
		let obj = localStorage.getItem(keyname)
		return obj ? JSON.parse(obj) : {}
	}

	deleteLocalObject(keyname:string) : void {
		localStorage.removeItem(keyname);
	}
}
