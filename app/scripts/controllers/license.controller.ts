module License.Controllers {
    'use strict';

    export interface ILicenseModel  {
		value : any; // {name: string; year: number; month: string; mediaId: number; image: string; licenseNumber: number};
        config : any;
        alias : string;
        label : string;
        onValueChanged : (newVal : any, oldVal : any) => void;
	}

    interface ILicenseControllerScope extends ng.IScope {
        model : ILicenseModel;

        months : Array<string>;
        years : Array<number>;

        setYear : (year : number) => void;
        setMonth : (month : string) => void;
        pickImage : () => void;
    }

    export class LicenseController {

		static $inject = ['$scope', 'LicenseService', 'dialogService'];
		constructor(private $scope : ILicenseControllerScope,  private LicenseService : Services.ILicenseService, private dialogService) {

            $scope.months = LicenseService.months();
        	$scope.years = LicenseService.years();

            if(!angular.isObject($scope.model.value)){
                $scope.model.value = {name: "", month: "June", year: 2010, mediaId: undefined, image: "", licenseNumber: undefined};
            }

            $scope.model.value.month = "June";
        	$scope.model.value.year = 2010;

            $scope.model.value.licenseNumber = LicenseService.generateLicenseNumber($scope.model);

        	$scope.setYear = function(year){
        		$scope.model.value.year = year;
        	};

        	$scope.setMonth = function(month){
        		$scope.model.value.month = month;
        	};

        	$scope.pickImage = function(){
        		dialogService.mediaPicker({callback:function(data){
        			$scope.model.value.image = data.image + "?width=120&height=180&mode=crop";
        			$scope.model.value.mediaId = data.id;
        		}});
        	};
        }
    }

    angular.module('umbraco').controller('LicenseController', LicenseController);
}
