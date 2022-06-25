var a = angular.module("myapp", ['ui.router']);
window.baseUrl = "https://10.21.86.46:8000"
a.config(['$stateProvider', function ($stateProvider) {
  $stateProvider
    .state('first', {
      url: '/login.html',
      templateUrl: 'login.html',
      controller: 'login'
    })
    .state('two', {
      url: '/register.html',
      templateUrl: 'register.html',
      controller: 'data'
    })
    .state('three', {
      url: '/index.html',
      templateUrl: 'index.html',
      controller: ''
    })
    .state('four', {
      url: '/dashboard.html',
      templateUrl: 'dashboard.html',
      controller: 'dashboard'
    })
    .state('five', {
      url: '/loginadmin.html',
      templateUrl: 'logina.html',
      controller: 'logina'
    })
    .state('six', {
      url: '/admin.html',
      templateUrl: 'admin.html',
      controller: 'admin'
    })
    .state('seven', {
      url: '/trash.html',
      templateUrl: 'trash.html',
      controller: 'trash'
    })
}]);
a.controller("login", function ($scope, $http, $location) {
  $scope.pass = ""
  $scope.user = ""
  $scope.func = function () {

    var pass = $scope.password;

    var user = $scope.user;

    var obj = { passw: pass, id: user }

    if (pass == "" || user == "") {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Data Missing "
      })
      return;
    }
    console.log(obj);
    $http({
      method: "POST",
      url: window.baseUrl + "/user/login/",
      data: JSON.stringify(obj),
      withCredentials: true,

    })

      .then(function (response) {
        console.log(response.status);
        {

          Swal.fire(
            'Good job!',
            'You are now logged in ',
            'success'
          )

          $location.path("/dashboard.html");

        }


      })
      .catch((response) => {

        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })

        console.log(err)
      })
  }


})
a.controller("data", function ($scope, $http, $location) {
  $scope.email = "";
  $scope.fname = "";
  $scope.lname = "";
  $scope.password = "";
  $scope.cpassword = "";
  $scope.user = "";
  $scope.func = function () {
    var email = $scope.email;
    var fname = $scope.fname;

    var lname = $scope.lname;

    var pass = $scope.password;

    var cpass = $scope.cpassword;

    var user = $scope.user;


    if (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Password must contain one special character, one capital letter, one small letter and one digit! "
      })
      return;
    }
    if (!cpass == pass) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Password and Confirm password don't match "
      })
      return;
    }
    if (fname == "" || lname == "") {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "First name and Last name "
      })
      return;
    }
    var obj = { username: user }
    $http({
      method: "POST",
      url: window.baseUrl + "/user/username_check/",
      data: JSON.stringify(obj),
      withCredentials: true,
      header: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      var obj = { mail: email, greet: user }

      console.log(obj);
      $http({
        method: "POST",
        url: window.baseUrl + "/otp/generate/",
        data: JSON.stringify(obj),
        withCredentials: true,
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function () {
          $scope.showHide()
        })
        .catch((response) => {

          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.error
          })

          console.log(err)
        })


    })
      .catch((response) => {
        if (response.status == 401) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.error
          })
        }
        console.log(err)
      })


    // var d = new Date(dob.replace(/-/g, '\/'));






  }
  $scope.show = true;
  $scope.showHide = function () {
    // if($scope.show == true){
    //   $scope.show = false;
    // }
    // else{
    //   $scope.show=true;
    // }
    $scope.show = !$scope.show
  };

  $scope.register = function () {

    var email = $scope.email;
    var fname = $scope.fname;

    var lname = $scope.lname;

    var pass = $scope.password;



    var user = $scope.user;

    var otp = $scope.otp;

    var obj = { passw: pass, username: user, otp: otp, fname: fname, lname: lname, mail: email }



    console.log(obj);
    $http({
      method: "POST",
      url: window.baseUrl + "/otp/verify/",
      data: JSON.stringify(obj),
      withCredentials: true,

    })

      .then(function (response) {
        console.log(response.status);
        if (response.status == 201) {

          Swal.fire(
            'Good job!',
            'Account has been registered ',
            'success'
          )

          $location.path("/login.html");

        }


      })
      .catch((response) => {
        if (response.status == 401) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.error
          })
        }
        console.log(err)
      })
  }


})
a.controller("dashboard", function ($scope, $http, $location) {
  $scope.dash = function () {
    $http({
      method: "GET",
      url: window.baseUrl + "/user/dashboard/",
      withCredentials: true,
    })
      .then(function (response) {
        // console.log(response.data);
        $scope.folderId = response.data.folderId;
        $scope.det = response.data.folders;
        $scope.deta = response.data.files;
        $scope.name = response.data.user_details.name;
        $scope.folderName = response.data.folderName;
        console.log(response.data.user_details.name)



      })
      .catch((response) => {
        console.log(response)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })
        $location.path('/login.html')
      })

  }
  $scope.dash();

  $scope.upload = function () {
    var file = document.querySelector("#file").files[0]
    var form = new FormData()
    form.append('file', file)
    form.append('folder', $scope.folderId)
    var obj = { type: file.type }

    $http({
      method: "POST",
      url: window.baseUrl + '/file/max_limit/',
      data: JSON.stringify(obj),
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data.max_limit)
      if (file.size > response.data.max_limit) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Max Limit Exceeded! "
        })
      }
      else {
        $http({
          method: 'POST',
          url: window.baseUrl + '/file/upload/',
          headers: {
            'Content-Type': undefined
          },
          data: form,
          transformRequest: angular.identity,
          withCredentials: true,
        })
          .then(function (response) {
            console.log(response.status);
            {

              Swal.fire(
                'Good job!',
                'Uploaded! ',
                'success'
              )
              $scope.showHide2($scope.folderId);
              document.querySelector("#file").value = ''

            }


          })
          .catch((response) => {

            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.error
            })

            console.log(err)
          })
      }
    })




  }

  $scope.showHide2 = function (id) {
    console.log(id)

    var obj = { folder: id }
    $http({
      method: "POST",
      url: window.baseUrl + "/folder/get_data/",
      data: JSON.stringify(obj),
      withCredentials: true,
    })
      .then(function (response) {
        // console.log(response.data);
        $scope.folderId = response.data.folderId;
        $scope.folderName = response.data.folderName;
        $scope.det = response.data.folders;
        $scope.deta = response.data.files;
        console.log($scope.deta)



      })
      .catch((err) => {
        console.log(err)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })
      })


  };

  $scope.delete = function (id) {
    console.log(id)

    var obj = { file : id }
    $http({
      method: "POST",
      url: window.baseUrl + "/file/delete/",
      data: JSON.stringify(obj),
      withCredentials: true,
    })
      .then(function () {
     
        $scope.showHide2($scope.folderId);

        Swal.fire(
          'Good job!',
          'Deleted! ',
          'success'
        )


      })
      .catch((err) => {
        console.log(err)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })
      })


  };
 
  $scope.deletef = function (id) {
    console.log(id)

    var obj = { folder : id }
    $http({
      method: "POST",
      url: window.baseUrl + "/folder/delete/",
      data: JSON.stringify(obj),
      withCredentials: true,
    })
      .then(function () {
     
        $scope.showHide2($scope.folderId);

        Swal.fire(
          'Good job!',
          ' Folder Deleted! ',
          'success'
        )


      })
      .catch((err) => {
        console.log(err)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })
      })


  };
 

  $scope.logout = function () {


    $http.get(window.baseUrl + "/user/logout/", { withCredentials: true })
      .then(function () {
        {
          Swal.fire(
            'Successfully',
            'Log Out ',
            'success'
          )
          $location.path("/index.html");

        }
      })

  }

  $scope.filename = "";
  $scope.create = function () {
    var file = $scope.filename;
    if (file.match(/[^a-zA-z0-9 ]/) || file == "") {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Folder name can only contain letters and numbers "

      })
      return;
    }
    var obj = { name: file, parent: $scope.folderId }
    $http({
      method: 'POST',
      url: window.baseUrl + '/folder/create/',
      withCredentials: true,
      data: JSON.stringify(obj),

    })
      .then(function () {

        {
          $scope.filename = ""
          Swal.fire(
            'Good job!',
            'Created! ',
            'success'
          )
          $scope.showHide2($scope.folderId);


        }


      })
      .catch((response) => {

        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })
      })

  }

  $scope.showHide3 = function (id) {
    console.log(id)

    var obj = { id : id }
    $http({
      method: "POST",
      url: window.baseUrl + "/file/download/",
      data: JSON.stringify(obj),
      withCredentials: true,
      responseType: "arraybuffer"
    })
      .then(function (response) {
        // console.log(response.data);
        console.log(response)
        var a = document.createElement("a");
        var blob = new Blob([response.data], {type: response.headers("Content-Type")})
        a.href = window.URL.createObjectURL(blob);
        
        
        var iframe = document.getElementById("preview")
        iframe.src=a.href;
        console.log(iframe.src)

        
         a.download = response.headers("Content-Disposition").split(";")[1].split("=")[1];
         a.click();
      })



  };





})
a.controller("logina", function ($scope, $http, $location) {
  $scope.pass = ""
  $scope.user = ""
  $scope.func = function () {

    var pass = $scope.password;

    var user = $scope.user;

    var obj = { passw: pass, id: user }

    if (pass == "" || user == "") {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Data Missing "
      })
      return;
    }
    console.log(obj);
    $http({
      method: "POST",
      url: window.baseUrl + "/admin/login/",
      data: JSON.stringify(obj),
      withCredentials: true,

    })

      .then(function (response) {
        console.log(response.status);
        {

          Swal.fire(
            'Good job!',
            'You are now logged in ',
            'success'
          )

          $location.path("/admin.html");

        }


      })
      .catch((response) => {

        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })

        console.log(err)
      })
  }


})
a.controller("admin", function ($scope, $http, $location) {
  $scope.submit = function () {
    $http({
      method: "GET",
      url: window.baseUrl + "/file/catogery_list/",
      withCredentials: true,

    })
      .then(function (response) {

        $scope.admin = response.data.list;
        console.log($scope.admin);
        // console.log($scope.admin)


      })

  }
  $scope.submit()

  $scope.logouta = function () {

    console.log("Loged out");
    $http.get(window.baseUrl + "/admin/logout/", { withCredentials: true })
      .then(function () {
        {
          Swal.fire(
            'Successfully',
            'Log Out ',
            'success'
          )

          $location.path("/index.html");

        }
      })

  }
  $scope.edit = function (id) {
    console.log(id)
    // var obj = { folder: id }
    // $http({
    //   method: "POST",
    //   url: window.baseUrl + "/folder/get_data/",
    //   data: JSON.stringify(obj),
    //   withCredentials: true,
    // })
    //   .then(function (response) {
    //     // console.log(response.data);
    //     $scope.folderId = response.data.folderId;
    //     $scope.folderName = response.data.folderName;
    //     $scope.det = response.data.folders;
    //     $scope.deta = response.data.files;
    //     console.log($scope.deta)



    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: response.data.error
    //     })
    //   })


  };

})
a.controller("trash", function ($scope,$http , $location){
  $scope.trash = function () {
    $http({
      method: "GET",
      url: window.baseUrl + "/user/trash/",
      withCredentials: true,
    })
      .then(function (response) {
        $scope.folderId = response.data.folderId;
        $scope.det = response.data.folders;
        $scope.deta = response.data.files;
        $scope.name = response.data.user_details.name;
        $scope.folderName = response.data.folderName;
        console.log(response.data.user_details.name)
       




      })
      .catch((response) => {
        console.log(response)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })
        $location.path('/login.html')
      })

  }
  $scope.trash(); 

  $scope.restore = function (id) {
    console.log(id)

    var obj = { file : id }
    $http({
      method: "POST",
      url: window.baseUrl + "/file/restore/",
      data: JSON.stringify(obj),
      withCredentials: true,
    })
      .then(function () {
     
        $scope.trash();

        Swal.fire(
          'Good job!',
          'Restored! ',
          'success'
        )


      })
      .catch((err) => {
        console.log(err)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })
      })


  };
  $scope.restorefold = function (id) {
    console.log(id)

    var obj = { folder : id }
    $http({
      method: "POST",
      url: window.baseUrl + "/folder/restore/",
      data: JSON.stringify(obj),
      withCredentials: true,
    })
      .then(function () {
     
        $scope.trash();

        Swal.fire(
          'Good job!',
          'Restored! ',
          'success'
        )


      })
      .catch((err) => {
        console.log(err)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error
        })
      })


  };
})







