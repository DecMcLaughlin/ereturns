
const port = window.location.port == '4200' ? '8080' : window.location.port;

export const environment = {
  production: false,
  secureUrl:true,
  baseUrl: `http://${window.location.hostname}:${port}/almacDART/api/`,
  authUrl: `http://${window.location.hostname}:${port}/`,
  gatewayHomeUrl: `https://cr-dev-web14.almacgroup.com:8777/gateway/faces/home.jspx`,
//  gatewaySignOutUrl: `https://cr-adfs-dev.almacgroup.com/adfs/ls/?wa=wsignout1.0`
  gatewaySignOutUrl: `https://cr-adfs-corporate.almacgroup.com/adfs/ls/?wa=wsignout1.0`,
  gatewayTOCUrl: 'https://st-gateway14.almacgroup.com/almac_toc.html'
};
