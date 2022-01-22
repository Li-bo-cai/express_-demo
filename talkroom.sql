/*
Navicat MySQL Data Transfer

Source Server         : TalkRoom
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : talkroom

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2021-08-20 14:13:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pwd` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('张三', '123', '1');
INSERT INTO `user` VALUES ('李四', '1234', '2');
INSERT INTO `user` VALUES ('王五', '12345', '3');

-- ----------------------------
-- Table structure for user_chat
-- ----------------------------
DROP TABLE IF EXISTS `user_chat`;
CREATE TABLE `user_chat` (
  `to_user_id` int(11) NOT NULL COMMENT '发送用户id',
  `to_user_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '发送用户名称',
  `from_user_id` int(11) NOT NULL COMMENT '接收用户id',
  `from_user_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '接收用户名称',
  `chat` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '聊天信息',
  `chat_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `chat_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_chat
-- ----------------------------

-- ----------------------------
-- Table structure for user_room
-- ----------------------------
DROP TABLE IF EXISTS `user_room`;
CREATE TABLE `user_room` (
  `to_user_id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`room_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_room
-- ----------------------------
