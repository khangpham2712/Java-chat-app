package com.chatapp.config;

import com.chatapp.jwt.JWTConfigurer;
import com.chatapp.service.Contains;
import com.chatapp.jwt.JwtTokenProvider;
import com.chatapp.repository.UserRepository;
import com.chatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserService userService;

    private final JwtTokenProvider tokenProvider;

    private final UserRepository userRepository;

    private final CorsFilter corsFilter;

    public WebSecurityConfig(JwtTokenProvider tokenProvider, UserRepository userRepository, CorsFilter corsFilter) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.corsFilter = corsFilter;
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        // Get AuthenticationManager bean
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .csrf()
                .disable()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
//            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .and()
                .headers()
                .and()
                .sessionManagement()
                .and()
                .authorizeRequests()
                .antMatchers("/api/authenticate").permitAll()
                .antMatchers("/api/register").permitAll()
                .antMatchers("/api/public/**").permitAll()
                .antMatchers("/api/admin/**").hasAuthority(Contains.ROLE_ADMIN)
                .antMatchers("/api/user/**").hasAuthority(Contains.ROLE_USER)
                .antMatchers("/api/employee/**").hasAnyAuthority(Contains.ROLE_ADMIN, Contains.ROLE_EMPLOYEE)
                .antMatchers("/websocket/**").permitAll()
                .and()
                .httpBasic().and()
                .apply(securityConfigurerAdapter());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {

    }
    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider, userRepository);
    }

}
