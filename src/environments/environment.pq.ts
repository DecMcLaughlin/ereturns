
const port = window.location.port == '4200' ? '8080' : window.location.port;

/*
* PQ CONFIGURATION
*/
export const environment = {
  production: false,
  secureUrl:true,
  baseUrl: `https://${window.location.hostname}:${port}/ereturns/api/`,
  authUrl: `https://${window.location.hostname}:${port}/`,
  gatewaySignOutUrl: `https://cr-adfs-pq.almacgroup.com/adfs/ls/?wa=wsignout1.0`,
  gatewayHomeUrl: `https://pq-gateway.almacgroup.com/gateway/faces/home.jspx`,
  gatewayTOCUrl: 'https://pq-gateway.almacgroup.com/almac_toc.html'
};


