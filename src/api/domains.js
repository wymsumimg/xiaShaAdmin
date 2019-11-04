let domainsFuc = (env) => {
  let domain, uri = location.href;
  if (uri.indexOf('test.i31') > -1) {
    domain = 'https://test.i31.com/AICard/NEW';
  } else {
    domain = 'https://aicard.i31.com/weiGuan';
  }

  return {
    domain: domain,
  }
};
export default domainsFuc