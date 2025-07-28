
const port = window.location.port == '4200' ? '8080' : window.location.port;

/*
* WEB14 CONFIGURATION
*/
export const environment = {
  production: false,
  secureUrl:true,
  baseUrl: `http://${window.location.hostname}:${port}/almacDART/api/`,
  authUrl: `http://${window.location.hostname}:${port}/`,
  gatewayHomeUrl: `https://cr-dev-web14.almacgroup.com:8777/gateway/faces/home.jspx`,
  gatewaySignOutUrl: `https://cr-adfs-dev.almacgroup.com/adfs/ls/?wa=wsignout1.0`,
  gatewayTOCUrl: 'https://dev-gatewaysso.pharms-services.com/almac_toc.html'
//gatewaySignOutUrl: `https://cr-adfs-corporate.almacgroup.com/adfs/ls/?wa=wsignout1.0`
};
