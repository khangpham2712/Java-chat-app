package com.chatapp.config;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.TransactionManager;

@Configuration
@ComponentScan("com.chatapp.*")
@PropertySource("classpath:application.properties")
@EntityScan(basePackages = "com.chatapp.entity")
public class HibernateConfig {

    // Lưu trữ các giá thuộc tính load bởi @PropertySource.
    @Autowired
    private Environment env;

    @Bean(name = "dataSource")
    public DataSource getDataSource() {
        DataSourceBuilder dataSource = DataSourceBuilder.create();

        // Xem: datasouce-cfg.properties
        dataSource.driverClassName(env.getProperty("ds.database-driver"));
        dataSource.url(env.getProperty("ds.url"));
        dataSource.username(env.getProperty("ds.username"));
        dataSource.password(env.getProperty("ds.password"));
        return dataSource.build();
    }

    @Bean
    public TransactionManager transactionManager(){
        JpaTransactionManager jpaTransactionManager = new JpaTransactionManager();
        jpaTransactionManager.setDataSource(getDataSource());
        jpaTransactionManager.setEntityManagerFactory(entityManagerFactory());
        return jpaTransactionManager;
    }
//    @Bean(name = "viewResolver")
//    public InternalResourceViewResolver getViewResolver() {
//        InternalResourceViewResolver Resolver = new InternalResourceViewResolver();
//        Resolver.setPrefix("/WEB-INF/jsp/");
//        Resolver.setSuffix(".jsp");
//        return Resolver;
//    }
    @Bean
    public EntityManagerFactory entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();
        hibernateJpaVendorAdapter.setShowSql(true);
        hibernateJpaVendorAdapter.setGenerateDdl(true);
        factory.setJpaVendorAdapter(hibernateJpaVendorAdapter);
        factory.setPackagesToScan("com.chatapp.entity");
        factory.setDataSource(getDataSource());
        factory.afterPropertiesSet();
        return factory.getObject();
    }


}
