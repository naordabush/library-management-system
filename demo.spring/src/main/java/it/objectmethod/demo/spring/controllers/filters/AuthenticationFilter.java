package it.objectmethod.demo.spring.controllers.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import it.objectmethod.demo.spring.services.JwtService;
import it.objectmethod.demo.spring.utils.Constants;

@Component
@Order(2)
public class AuthenticationFilter implements Filter {

	@Autowired
	private JwtService jwtService;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpReq = (HttpServletRequest) request;
		HttpServletResponse httpResp = (HttpServletResponse) response;
		String url = httpReq.getRequestURI();
		String method = httpReq.getMethod();

		// boolean GET = "GET".equals(method);
		boolean publicApiWithoutToken = url.endsWith("users/login") || url.endsWith("users/register");
		if (publicApiWithoutToken) {
			chain.doFilter(request, response);
		} else {
			String token = httpReq.getHeader(Constants.TOKEN_HEADER_NAME);
			if (token != null) {
				boolean permitted = this.checkComplexPermissions(url, token, method);
				if (permitted) {
					chain.doFilter(request, response);
				} else {
					httpResp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				}
			} else {
				httpResp.setStatus(HttpServletResponse.SC_FORBIDDEN);
			}
		}
	}

	private boolean checkComplexPermissions(String url, String token, String method) {

		// Add some logic if you need to check more permissions
		// but for now just return if the token is valid
		return this.jwtService.checkJWTToken(token);

	}
}