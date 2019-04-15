define({ "api": [
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
  }
] });
