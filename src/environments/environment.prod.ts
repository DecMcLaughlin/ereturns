
const port = window.location.port == '4200' ? '8080' : window.location.port;

/*
* LIVE CONFIGURATION
*/
export const environment = {
  production: true,
  secureUrl:true,
  baseUrl: `https://${window.location.hostname}:${port}/ereturns/api/`,
  authUrl: `https://${window.location.hostname}:${port}/`,
  gatewaySignOutUrl: `https://cr-adfs.almacgroup.com/adfs/ls/?wa=wsignout1.0`,
  gatewayHomeUrl: `https://gateway.almacgroup.com/gateway/faces/home.jspx`,
  gatewayTOCUrl: 'https://gateway.almacgroup.com/almac_toc.html'
};
