define({ "api": [
  {
    "type": "GET",
    "url": "/api/addmusic/addToLib",
    "title": "Add music to user library",
    "name": "Add_Music_to_user_library",
    "group": "AddMusic",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trackId",
            "description": "<p>The mbid of the track as required by the last.fm api to get track details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    trackId : 060e38a6-9ad9-44d3-abc1-741a0bf633ca\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Boolean to inform if the API was success or errored</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The info whether a track is added or not</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success : true,\n    message: \"Track added to user library\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/addmusic.route.js",
    "groupTitle": "AddMusic"
  },
  {
    "type": "GET",
    "url": "/api/addmusic/search",
    "title": "Search Music",
    "name": "Search_a_music_from_last_fm_service",
    "group": "AddMusic",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searckKey",
            "description": "<p>The keyword to search the track, album, artist</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Boolean to inform if the API was success or errored</p>"
          },
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>tracks result as got from the last.fm api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success : true,\n    data: {tracks: { ... }}\n}",
          "type": "type"
        }
      ]
    },
    "filename": "server/routes/addmusic.route.js",
    "groupTitle": "AddMusic"
  },
  {
    "type": "POST",
    "url": "/api/auth/register",
    "title": "User Registration",
    "name": "Register_User",
    "group": "Auth",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email to register</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fname",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lname",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passwordConfirm",
            "description": "<p>Password confirmation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    email: \"shahvicky1992@gmail.com\",\n    fname: \"Vivek\",\n    lname: \"Shah\",\n    password: \"*****\",\n    passwordConfirm: \"*****\"\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Boolean to inform if the API was success or errored</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Registraction message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"message\":\"Successfully registered.\",\n    \"success\":true\n}",
          "type": "type"
        }
      ]
    },
    "filename": "server/routes/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Logs in a user and returns token if correct email and password is provided",
    "name": "login",
    "group": "Auth",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user emailid</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "body : {\n \"email\" : \"shahvicky1992@gmail.com\",\n \"password\": \"*********\"\n}",
          "type": "js"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Boolean to inform if the API was success or errored</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The jwt token generated by the</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n success: true,\n token:jwt token\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "GET",
    "url": "/api/health-check",
    "title": "Server Monitoring",
    "name": "Health_Check_API_for_monitoring",
    "group": "Index",
    "version": "1.0.0",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Boolean to inform if the API was success or errored</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>OK if the server is running and is connected to the databases</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success : true,\n    message : 'OK'\n}",
          "type": "type"
        }
      ]
    },
    "filename": "server/routes/index.route.js",
    "groupTitle": "Index"
  },
  {
    "type": "GET",
    "url": "/api/dashboard/tracks",
    "title": "Dashboard Tracks",
    "name": "Get_user_tracks_on_the_dashboard",
    "group": "dashboard",
    "version": "1.0.0",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Boolean to inform if the API was success or errored</p>"
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>The array of tracks to display on dashboard</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    data: [{trkTrackId: \"060e38a6-9ad9-44d3-abc1-741a0bf633ca\", trkUserId: 5, trkTrackName: \"Yanar?m\",…},…],\n    success: true\n}",
          "type": "type"
        }
      ]
    },
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "id-token",
            "description": "<p>The unique jwt token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{ \n \"Authorization\": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE1NTUzNjUwNTQsImV4cCI6MTU1NTM3NTA1NH0.Wu-6yZiFzizAM5ZzvKvhSWSaD4900LvAOWKgOBKXtbM\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/routes/dashboard.routes.js",
    "groupTitle": "dashboard"
  }
] });
