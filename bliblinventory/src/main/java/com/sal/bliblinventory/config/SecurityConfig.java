package com.sal.bliblinventory.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.Arrays;

@EnableWebSecurity(debug = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private DataSource dataSource;

    @Value("${spring.queries.users-query}")
    private String usersQuery;

    @Value("${spring.queries.roles-query}")
    private String rolesQuery;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.
                jdbcAuthentication()
                .usersByUsernameQuery(usersQuery)
                .authoritiesByUsernameQuery(rolesQuery)
                .dataSource(dataSource)
                .passwordEncoder(bCryptPasswordEncoder)
        ;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                //.authorizeRequests()
                //.anyRequest().permitAll().and()
                .csrf().disable();
                System.out.print("------------------------------Masuk--------------------------");
//                .authorizeRequests()
//                .antMatchers(HttpMethod.POST, "/api/*").permitAll()
//                .antMatchers("/loginPage").permitAll()
//                .antMatchers("/employee/**").hasAuthority("EMPLOYEE")
//                .antMatchers("/superior/**").hasAuthority("SUPERIOR")
//                .antMatchers("/admin/**").hasAuthority("ADMIN")
//                .and().csrf().disable()//.ignoringAntMatchers("/nocsrf", "/api/**");
//        //http .authorizeRequests().and()
//                .formLogin()
//                .loginPage("/loginPage").failureUrl("/login?error=true")
//                .defaultSuccessUrl("/")
//                .usernameParameter("username")
//                .passwordParameter("password")
//                .and().logout()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//                .logoutSuccessUrl("/").and().exceptionHandling()
//                .accessDeniedPage("/access-denied");
    }
//
//    @Bean
//    CorsConfigurationSource corsConfigurationSource(){
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("*"));
//        configuration.setAllowedMethods(Arrays.asList("*"));
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        //web
            //.ignoring()
            //.antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**", "/assets/**");
    }

}
