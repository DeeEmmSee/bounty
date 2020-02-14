/*
SQLyog Community
MySQL - 8.0.15 : Database - bounty
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `bounties` */

DROP TABLE IF EXISTS `bounties`;

CREATE TABLE `bounties` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `GameID` int(11) NOT NULL,
  `Title` varchar(128) NOT NULL,
  `BountyCondition` varchar(128) NOT NULL,
  `Description` varchar(1028) NOT NULL,
  `Image` varchar(512) DEFAULT NULL,
  `Status` int(11) NOT NULL,
  `AllowContributors` bit(1) NOT NULL,
  `Featured` bit(1) DEFAULT b'0',
  `CreatedBy` int(11) NOT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ClaimedBy` int(11) DEFAULT NULL,
  `ClaimedDate` timestamp NULL DEFAULT NULL,
  `UpdatedDateTime` timestamp NULL DEFAULT NULL,
  `MaxAttempts` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

/*Data for the table `bounties` */

insert  into `bounties`(`ID`,`GameID`,`Title`,`BountyCondition`,`Description`,`Image`,`Status`,`AllowContributors`,`Featured`,`CreatedBy`,`CreatedDate`,`ClaimedBy`,`ClaimedDate`,`UpdatedDateTime`,`MaxAttempts`) values 
(39,4,'test','test','test','https://www.w3schools.com/bootstrap4/la.jpg',1,'','',1,'2020-02-10 15:00:21',NULL,'2020-01-01 11:00:00','2020-01-13 21:29:59',0),
(40,1,'b2','test','test','https://www.w3schools.com/bootstrap4/la.jpg',1,'','',1,'2020-02-10 15:00:22',NULL,'2020-01-02 12:00:00','2020-01-13 21:47:52',0),
(41,7,'b3','test','reee','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',1,'2020-02-10 15:00:23',NULL,NULL,'2020-01-13 21:48:05',0),
(42,1,'test','test','test','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',29,'2020-02-10 15:00:24',NULL,NULL,NULL,0),
(43,1,'test2','test2','test2','https://www.w3schools.com/bootstrap4/la.jpg',1,'\0','\0',29,'2020-02-10 15:00:25',NULL,NULL,NULL,0),
(44,5,'test3','test3','test3','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',29,'2020-02-11 14:20:59',NULL,NULL,NULL,0),
(45,5,'test4','test4','test4','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',29,'2020-02-10 15:00:26',NULL,NULL,NULL,0),
(46,6,'test5','test5','test5','https://www.w3schools.com/bootstrap4/la.jpg',1,'\0','\0',29,'2020-02-10 15:00:28',NULL,NULL,NULL,0),
(47,3,'test6','test6','test6','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',29,'2020-02-10 15:00:29',NULL,NULL,NULL,0),
(48,5,'test7','test7','test7','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',29,'2020-02-10 15:00:30',NULL,NULL,NULL,0),
(49,7,'test8','test8','test8','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',29,'2020-02-10 15:00:31',NULL,NULL,NULL,0),
(54,5,'spy5','spy5','spy5','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',29,'2020-02-10 15:00:32',NULL,NULL,NULL,0),
(55,4,'testcomp','testcomp','testcomp','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',29,'2020-02-11 14:21:00',NULL,NULL,NULL,0),
(56,7,'attempt','attemp','attempt','https://www.w3schools.com/bootstrap4/la.jpg',1,'','\0',28,'2020-02-10 15:05:50',NULL,NULL,NULL,1);

/*Table structure for table `bountyattempts` */

DROP TABLE IF EXISTS `bountyattempts`;

CREATE TABLE `bountyattempts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `BountyID` int(11) DEFAULT NULL,
  `Proof` varchar(128) DEFAULT NULL,
  `DateAdded` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `StatusID` int(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `bountyattempts` */

insert  into `bountyattempts`(`ID`,`UserID`,`BountyID`,`Proof`,`DateAdded`,`StatusID`) values 
(1,28,54,'youtube.com','2020-02-10 14:51:44',0),
(5,29,56,'twitch.tv/test3','2020-02-10 16:30:45',0);

/*Table structure for table `bountycontributions` */

DROP TABLE IF EXISTS `bountycontributions`;

CREATE TABLE `bountycontributions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `BountyID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `DateAdded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Paid` bit(1) DEFAULT b'0',
  `DatePaid` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `bountycontributions` */

insert  into `bountycontributions`(`ID`,`BountyID`,`UserID`,`Amount`,`DateAdded`,`Paid`,`DatePaid`) values 
(9,40,1,100.00,'2020-02-03 12:27:50','\0',NULL),
(10,41,1,50.00,'2020-02-03 12:27:50','\0',NULL),
(11,40,20,25.00,'2020-02-03 12:27:50','\0',NULL),
(12,44,29,123.00,'2020-02-03 12:27:50','','2020-02-11 13:55:29'),
(13,48,29,555.00,'2020-01-31 14:19:04','\0',NULL),
(14,49,29,777.00,'2020-01-31 14:19:36','\0',NULL),
(15,54,29,123.00,'2020-02-03 13:33:03','','2020-02-11 13:30:05'),
(16,40,29,75.00,'2020-02-03 14:50:04','','2020-02-11 13:26:42'),
(17,55,29,111.00,'2020-02-07 15:24:32','','2020-02-11 13:25:08'),
(21,54,28,100.00,'2020-02-10 14:25:42','\0',NULL);

/*Table structure for table `games` */

DROP TABLE IF EXISTS `games`;

CREATE TABLE `games` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) NOT NULL,
  `Year` int(11) NOT NULL,
  `Console` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `games` */

insert  into `games`(`ID`,`Name`,`Year`,`Console`) values 
(1,'Tetris',1989,'NES'),
(2,'Tetris99',2018,'Switch'),
(3,'Overwatch',2016,'PC'),
(4,'Destiny 2',2015,'PC'),
(5,'Spyro: Reignited Trilogy',2018,'PS4'),
(6,'Halo: Master Chief Collection',2014,'Xbox One'),
(7,'Counter Strike: Global Offensive',2012,'PC');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(64) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `DateRegistered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastLoggedInDate` timestamp NULL DEFAULT NULL,
  `Avatar` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`ID`,`Username`,`Password`,`Email`,`DateRegistered`,`LastLoggedInDate`,`Avatar`) values 
(16,'DMC','XKribCLR9oMYvOWH1JMbOw==$NEBE4ei4iV0uY34A84pNN3x1SyDvR6DMhYg6NiBVc997kuAWf3uT6J3uuwicOLaYJnd6gjiAuQd5HrSTLtBOsA==','test@test.com','2020-01-04 18:33:54',NULL,NULL),
(17,'dmc','zdfrSahJZXY/+hqCMXbCgg==$5yJheNzKyumoWvHvBlj5f1Durq/PGjO5J3sP9c240R2lRfBDeogRebhBYZ6c4b3Sfxw0K73OYbg9JIqC6WpcrA==','test2@test.com','2020-01-04 18:34:09',NULL,NULL),
(18,'dmc2','RlScRIAfYzefKv+4q8gVZA==$ugPTkaY5ZFyaGAPLh7e0MTy67pIhLK5twYaZHBi6iHisuZg3eVU+1AF0HqDkt6CbxCdwB5+G6zuWmfpflZPRmw==','testr3@test.com','2020-01-04 18:50:50',NULL,NULL),
(19,'test','YJIHKh5f9JrkXnY6EZlJNA==$yvQ5JmicZKb5p4TZceCJb6y+16Sv46Xnlm7spYFuG0P/yt+telsWrFGVsuP5ecQnIhBFYrdPMDbaOmFpIINvUw==','test5@myemail.com','2020-01-08 22:38:43',NULL,NULL),
(21,'DMC','qhyMCa/gH+IN2Y+Z/Y0vXw==$re1/Jyc/x9PMnQrMv6d+xclVsNInx/Qz70d36p+UA5TlzEr6RbLTU61XYxQi0aOIiw9IiETaMKnDk3tDyuWfMg==','dmc@test.com','2020-01-14 21:44:57',NULL,NULL),
(22,'react','aUZIcjfse53HIyXMMGYnIQ==$XPlRynq7iurq5x3ZwWQvHHg+XTPNRTFihjyX12LBVVtOmgPI8znWyGvm16iRKVoXW7xHL2d8bWGe/BHrEQjh9w==','react@test.com','2020-01-29 11:04:59',NULL,NULL),
(23,'react2','yFgQAk3mU6jiD1x0Acscug==$w2fBviNMSzoRb6Xw0+2D+igms2v+0LfyWtR4DZSZXc/WjjqBohoCCE3CvFsb306QIobKvcoYQIXJyooIV/m3ag==','react2@test.com','2020-01-29 11:07:56',NULL,NULL),
(24,'react3','zodl0h/rMgNWU46vHTfvXg==$u2xC3e6aLhcjPgvujnzBuQgtRVavF8UT/S9yy2KN1DaK7/2QOBmtYR4lTxrd5jAwxXRoDsalBBd92FZT6f6a4w==','react3@test.com','2020-01-29 11:11:49',NULL,NULL),
(25,'react4','ZoLmqNZylDBlE/Ji+aHMeQ==$Z8FRaL358kRfe1hQTWUT8EpnTS9vHZYd7RmIKNZtjsaN/2BYCcG2ozMKz4Ab7Flk1n7OAV2XSTYqq2Z4f5kugw==','react4@test.com','2020-01-29 11:12:25',NULL,NULL),
(26,'react5','8hgjE65jjzfxIJ3hjWFaWQ==$NlEsZu0x/Yu4TCfCuKOrrlzG8zuZhVjHwmlmw6HSLTfAhOhr8b5wjGxpSry+e5tluv4FeIJZBwE+TSPapDCuxg==','react5@test.com','2020-01-29 11:14:23',NULL,NULL),
(27,'react6','OKvuAQqhOZb+CdFIcH9XLg==$hlV6ryvMPo2KooJyrBIhJUhK627sfU8MLEK7/rGW1L1DMJvwP7ZQy8S13/Q7VL7uev9JArPt2XFaopO/tH+9xA==','react6@test.com','2020-01-29 11:20:08',NULL,NULL),
(28,'react7','O7Xq/ksC6Qp6FNjCe6oDNA==$GipJSGvishF3qKXDLUB1szBk7sZqmxYAAApL7cLLWWPHh56xBQ76clXwpypwen8rqI9uTt8s69XlIZVKF7lxNw==','react7@test.com','2020-01-29 11:20:56',NULL,NULL),
(29,'react8','LUieZueMeIVJIq/TsQbw2Q==$CVpM+p80UsnG3mkZK7KVdwcr9MnNd7rzcWhrzN+jLjAan2lQD+CDbgJoQCCME0yK0pZMRB1VFUTe+hxH4wy/2Q==','react8@test.com','2020-01-29 11:23:46',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
