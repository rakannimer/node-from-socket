module.exports = function(plop) {
  plop.setGenerator("route", {
    description: "Create a socket route handler",
    prompts: [
      {
        type: "module",
        name: "moduleName",
        message: "Module name (e.g. fs)"
      },
      {
        type: "input",
        name: "routeName",
        message: "Route name"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/server/{{moduleName}}/{{routeName}}.js",
        templateFile: "plop-templates/socket-io-route.js"
      },
      {
        type: "append",
        path: "src/server/main.js",
        pattern: /\<RequestHandlersImports\>/gi,
        template: `import { onRequest as on{{pascalCase routeName }} } from "./{{moduleName}}/{{routeName}}"`
      },
      {
        type: "append",
        path: "src/server/main.js",
        pattern: /\<RequestHandlers\>/gi,
        template: ` on{{pascalCase routeName }}(client, "{{moduleName}}.{{routeName}}")`
      }
    ]
  });
};
