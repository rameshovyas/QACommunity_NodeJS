-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 20, 2022 at 05:21 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `QACommunity`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `id` int(11) NOT NULL,
  `ques_id` int(11) NOT NULL,
  `answer` text NOT NULL,
  `postedBy` int(11) NOT NULL,
  `postedOn` date NOT NULL,
  `upVotes` int(11) DEFAULT '0',
  `downVotes` int(11) DEFAULT '0',
  `accepted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `ques` text NOT NULL,
  `postedBy` int(11) NOT NULL,
  `postedOn` date NOT NULL,
  `downVotes` int(11) DEFAULT '0',
  `upVotes` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `title`, `ques`, `postedBy`, `postedOn`, `downVotes`, `upVotes`) VALUES
(1, 'create buttons and click event programatically', '\r\n\r\nI have a question. Is it possible to create dynamically buttons and click events to it ? For example I want to create 4 buttons with 4 different click events. It is not necessary to make it with MVVM pattern. At the begining I would like just to know is it possible and how can I achieve this.\r\n', 1, '2022-11-20', 0, 0),
(2, 'WPF unit tests in docker container', 'I\'m using the following command to run some XUnit tests within a docker container docker run --rm -it -v ${pwd}:c:\\app\\ -w \\app mcr.microsoft.com/dotnet/sdk:6.0 dotnet test This works grea', 1, '2022-11-11', 0, 0),
(3, 'Passing an object array to child component', 'I am working on the front-end of a bootcamp project and I am having an issue when passing an object array to a child component. For now, I am creating a variable array to test components.', 1, '2022-11-09', 0, 0),
(4, 'How to get data without refreshing Using XML', 'I am trying to push an email from an input firls to an array in plain javascript. but only an empty parapragh tag is getting pushed.', 1, '2022-11-15', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_auth`
--

CREATE TABLE `user_auth` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `sessionId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_auth`
--

INSERT INTO `user_auth` (`id`, `firstName`, `lastName`, `username`, `user_password`, `sessionId`) VALUES
(1, 'Ramesh', 'Vyas', 'ramesh@gmail.com', '$2b$10$pKXgO.VWvwEMpuNp925BiOrlfHRhy7Vx3SCyqNX47MjF/O5UfNatm', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_auth`
--
ALTER TABLE `user_auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_auth`
--
ALTER TABLE `user_auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
