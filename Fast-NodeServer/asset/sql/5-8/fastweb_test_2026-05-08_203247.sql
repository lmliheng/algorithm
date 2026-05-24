-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fastweb_test
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `article_id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `content` longtext COMMENT '文章内容',
  `user` bigint unsigned NOT NULL COMMENT '创建用户ID',
  `status` tinyint(1) DEFAULT '0' COMMENT '状态：0-草稿，1-已发布，2-仅自己可见',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`article_id`),
  KEY `idx_user` (`user`),
  CONSTRAINT `fk_article_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Node.js 快速入门','Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境...',1,0,'2026-05-08 10:38:40','2026-05-08 10:38:40'),(2,'MySQL 数据库设计','好的数据库设计是应用成功的基础...',2,1,'2026-05-08 10:38:40','2026-05-08 12:31:57'),(3,'我的 2026 年展望','新的一年，新的开始...',3,2,'2026-05-08 10:38:40','2026-05-08 12:31:57'),(4,'Express 框架最佳实践','Express 是 Node.js 最流行的 Web 框架之一...',1,1,'2026-05-08 10:38:40','2026-05-08 12:31:57'),(5,'如何学习编程','学习编程需要耐心和实践...',4,1,'2026-05-08 10:38:40','2026-05-08 12:31:57');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

--
-- Table structure for table `article_category`
--

DROP TABLE IF EXISTS `article_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_category` (
  `category_id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '文章分类ID',
  `category_name` varchar(100) NOT NULL COMMENT '文章分类名称',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user` bigint unsigned DEFAULT NULL COMMENT '创建用户ID',
  PRIMARY KEY (`category_id`),
  KEY `idx_user` (`user`),
  CONSTRAINT `fk_article_category_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_category`
--

/*!40000 ALTER TABLE `article_category` DISABLE KEYS */;
INSERT INTO `article_category` VALUES (1,'技术博客','2026-05-08 18:38:40','2026-05-08 18:38:40',1),(2,'生活随笔','2026-05-08 18:38:40','2026-05-08 18:38:40',1),(3,'项目案例','2026-05-08 18:38:40','2026-05-08 18:38:40',2),(4,'学习笔记','2026-05-08 18:38:40','2026-05-08 18:38:40',3);
/*!40000 ALTER TABLE `article_category` ENABLE KEYS */;

--
-- Table structure for table `articleandcategory_middle`
--

DROP TABLE IF EXISTS `articleandcategory_middle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articleandcategory_middle` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL COMMENT '文章id',
  `category_id` bigint unsigned NOT NULL COMMENT '分类id',
  PRIMARY KEY (`id`),
  KEY `idx_article_id` (`article_id`),
  KEY `idx_category_id` (`category_id`),
  CONSTRAINT `fk_middle_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_middle_category` FOREIGN KEY (`category_id`) REFERENCES `article_category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='中间表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articleandcategory_middle`
--

/*!40000 ALTER TABLE `articleandcategory_middle` DISABLE KEYS */;
INSERT INTO `articleandcategory_middle` VALUES (1,1,1),(2,1,4),(3,2,1),(4,3,2),(5,4,1),(6,4,4),(7,5,2),(8,5,4);
/*!40000 ALTER TABLE `articleandcategory_middle` ENABLE KEYS */;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `permission_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(255) NOT NULL COMMENT '权限名',
  `permission_description` varchar(255) DEFAULT '权限未定义描述值' COMMENT '权限描述',
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `permission_name` (`permission_name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'user:create','创建用户'),(2,'user:read','查看用户'),(3,'user:update','更新用户'),(4,'user:delete','删除用户'),(5,'article:create','创建文章'),(6,'article:read','查看文章'),(7,'article:update','更新文章'),(8,'article:delete','删除文章'),(9,'category:create','创建分类'),(10,'category:read','查看分类'),(11,'category:update','更新分类'),(12,'category:delete','删除分类');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL DEFAULT '普通用户' COMMENT '角色名',
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='角色';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (2,'普通用户'),(3,'编辑'),(1,'超级管理员');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

--
-- Table structure for table `roleandpermission_middle`
--

DROP TABLE IF EXISTS `roleandpermission_middle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roleandpermission_middle` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `permission_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_role_id` (`role_id`),
  KEY `idx_permission_id` (`permission_id`),
  CONSTRAINT `fk_role_permission_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_role_permission_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roleandpermission_middle`
--

/*!40000 ALTER TABLE `roleandpermission_middle` DISABLE KEYS */;
INSERT INTO `roleandpermission_middle` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,3,2),(14,3,5),(15,3,6),(16,3,7),(17,3,8),(18,3,9),(19,3,10),(20,3,11),(21,3,12),(22,2,2),(23,2,6),(24,2,10);
/*!40000 ALTER TABLE `roleandpermission_middle` ENABLE KEYS */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `email` varchar(100) DEFAULT 'liheng@test' COMMENT '邮箱',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `password` varchar(255) NOT NULL COMMENT '密码(加密存储)',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `role_id` bigint unsigned DEFAULT '2' COMMENT '角色ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_role` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1778237621053 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@test.com',NULL,'$2b$10$hJgz2SAuG7vkZlmVGxqBCOA9qvSzl0snGQnVSLxzPc5e43.79D7iW','2026-05-08 18:38:40','2026-05-08 18:47:45',1),(2,'editor','editor@test.com',NULL,'$2b$10$hJgz2SAuG7vkZlmVGxqBCOA9qvSzl0snGQnVSLxzPc5e43.79D7iW','2026-05-08 18:38:40','2026-05-08 18:44:49',3),(3,'user1','user1@test.com',NULL,'$2b$10$hJgz2SAuG7vkZlmVGxqBCOA9qvSzl0snGQnVSLxzPc5e43.79D7iW','2026-05-08 18:38:40','2026-05-08 18:44:49',2),(4,'user2','user2@test.com',NULL,'$2b$10$hJgz2SAuG7vkZlmVGxqBCOA9qvSzl0snGQnVSLxzPc5e43.79D7iW','2026-05-08 18:38:40','2026-05-08 18:44:49',2),(1778237621052,'liheng2','liheng@112',NULL,'$2b$10$gvzoeUx09y6PJ1LR/GIYrusdmP2rlcGq2I88vASey28Al./OVDIoa','2026-05-08 18:53:41','2026-05-08 18:53:41',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

--
-- Dumping routines for database 'fastweb_test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-08 20:33:03
