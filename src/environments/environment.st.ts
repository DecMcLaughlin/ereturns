
const port = window.location.port == '4200' ? '8080' : window.location.port;

/*
* WEB14 CONFIGURATION
*/
export const environment = {
  production: false,
  secureUrl:true,
  baseUrl: `https://${window.location.hostname}:${port}/ereturns/api/`,
  authUrl: `https://${window.location.hostname}:${port}/`,
  gatewayHomeUrl: `https://st-gateway14.almacgroup.com/gateway/faces/home.jspx`,
  gatewaySignOutUrl: `https://cr-adfs-st.almacgroup.com/adfs/ls/?wa=wsignout1.0`,
  gatewayTOCUrl: 'https://st-gateway14.almacgroup.com/almac_toc.html'
//gatewaySignOutUrl: `https://cr-adfs-corporate.almacgroup.com/adfs/ls/?wa=wsignout1.0`
};
