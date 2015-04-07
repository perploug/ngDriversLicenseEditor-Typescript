module License.Services {
	'use strict';

	export interface ILicenseService{
        months(): Array<string>;
        years() : Array<number>;
		generateLicenseNumber(model : License.Controllers.ILicenseModel) : number;
    }

	export class LicenseService implements ILicenseService {
		// $inject annotation.
		// It provides $injector with information about dependencies to be injected into constructor
		// it is better to have it close to the constructor, because the parameters must match in count and type.
		// See http://docs.angularjs.org/guide/di
		static $inject = ['$http'];
		constructor(private $http : ng.IHttpService) {

		}

		generateLicenseNumber(model : License.Controllers.ILicenseModel) : number{

			var key = model.value.name + model.value.year + model.value.month;
			var hash = 0, i, chr, len;
			if (key.length == 0) return hash;

			for (i = 0, len = key.length; i < len; i++) {
			    chr   = key.charCodeAt(i);
			    hash  = ((hash << 5) - hash) + chr;
			    hash |= 0; // Convert to 32bit integer
			  }
			return hash;
		}

		months() : Array<string>{
			return  [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December"
						];
		}


		years() : Array<number>{
			return [2014, 2013, 2012, 2011, 2010, 2009];
		}
	}


	angular.module("umbraco.services").service("LicenseService", LicenseService);
}
