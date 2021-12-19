-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 17 2021 г., 22:30
-- Версия сервера: 10.5.11-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `express_project`
--

-- --------------------------------------------------------

--
-- Структура таблицы `devices`
--

CREATE TABLE `devices` (
  `id` int(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `status` set('on','off') NOT NULL DEFAULT 'on,off',
  `schedule_start` set('on','off') DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `program` varchar(16) DEFAULT NULL,
  `silent_mode` set('on','off') DEFAULT NULL,
  `ionization_mode` set('on','off') DEFAULT NULL,
  `air_conditioning` set('on','off') DEFAULT NULL,
  `flow_temperature,_°C` varchar(16) DEFAULT NULL,
  `brightness,_%` varchar(16) DEFAULT NULL,
  `lights_color` varchar(7) DEFAULT NULL,
  `speed,_RPM` varchar(16) DEFAULT NULL,
  `resolution` set('320p','480p','720p','1080p') DEFAULT NULL,
  `night_mode` set('on','off') DEFAULT NULL,
  `password` varchar(16) DEFAULT NULL,
  `force_lock` set('on','off') DEFAULT NULL,
  `blinds` set('open','close') DEFAULT NULL,
  `flow_rate,_%` varchar(16) DEFAULT NULL,
  `section_1_temperature,_°C` varchar(16) DEFAULT NULL,
  `section_2_temperature,_°C` varchar(16) DEFAULT NULL,
  `section_3_temperature,_°C` varchar(16) DEFAULT NULL,
  `freezer_temperature,_°C` varchar(16) DEFAULT NULL,
  `ice_maker` set('on','off') DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `delicate_mode` set('on','off') DEFAULT NULL,
  `alarm_clock` set('on','off') DEFAULT NULL,
  `alarm_time` time(6) DEFAULT NULL,
  `wattage,_W` varchar(16) DEFAULT NULL,
  `steam_preheat` set('on','off') DEFAULT NULL,
  `processor_setting` set('low','high','pulse') DEFAULT NULL,
  `channel` varchar(16) DEFAULT NULL,
  `volume,_%` varchar(16) DEFAULT NULL,
  `schedule_stop` set('on','off') DEFAULT NULL,
  `stop_time` datetime(6) DEFAULT NULL,
  `find/play_track` varchar(64) DEFAULT NULL,
  `auto_play` set('on','off') DEFAULT NULL,
  `bass_boost` set('on','off') DEFAULT NULL,
  `activate_camera` set('on','off') DEFAULT NULL,
  `activate_voice_channel` set('on','off') DEFAULT NULL,
  `portion_size,_g` varchar(16) DEFAULT NULL,
  `energy_save_mode` set('on','off') DEFAULT NULL,
  `section_1_firmness` set('soft','medium','firm') DEFAULT NULL,
  `section_2_firmness` set('soft','medium','firm') DEFAULT NULL,
  `track_heartbeat` set('on','off') DEFAULT NULL,
  `activate_security_system` set('on','off') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `devices`
--

INSERT INTO `devices` (`id`, `name`, `type`, `status`, `schedule_start`, `start_time`, `program`, `silent_mode`, `ionization_mode`, `air_conditioning`, `flow_temperature,_°C`, `brightness,_%`, `lights_color`, `speed,_RPM`, `resolution`, `night_mode`, `password`, `force_lock`, `blinds`, `flow_rate,_%`, `section_1_temperature,_°C`, `section_2_temperature,_°C`, `section_3_temperature,_°C`, `freezer_temperature,_°C`, `ice_maker`, `notes`, `delicate_mode`, `alarm_clock`, `alarm_time`, `wattage,_W`, `steam_preheat`, `processor_setting`, `channel`, `volume,_%`, `schedule_stop`, `stop_time`, `find/play_track`, `auto_play`, `bass_boost`, `activate_camera`, `activate_voice_channel`, `portion_size,_g`, `energy_save_mode`, `section_1_firmness`, `section_2_firmness`, `track_heartbeat`, `activate_security_system`) VALUES
(98, 'MacPC', 'Personal computer', 'on', 'off', '2021-12-16 12:53:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '84', 'on', '2021-12-17 16:57:00.000000', 'Track name - Author', 'on', 'on', NULL, NULL, NULL, 'off', NULL, NULL, NULL, NULL),
(99, 'mySmartCar01', 'Car', 'on', 'off', '2021-12-16 13:38:00', NULL, NULL, NULL, 'off', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '35', '20', '36', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'off', '2021-12-16 13:38:00.000000', 'Track name - Author', 'on', 'on', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'on'),
(100, 'SmartWateringSystem001', 'Sprinkler', 'on', 'off', '2021-12-29 16:44:00', '3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'off', '2021-12-16 13:41:00.000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(101, 'CleanHouseDisher', 'Dishwater', 'on', 'on', '2021-12-30 18:40:00', '3', 'on', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'on', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(103, 'Cooker007', 'Food processor', 'on', NULL, NULL, '4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'high', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(104, 'BabyMonitor3000', 'Baby monitor', 'on', 'on', '2021-12-24 23:06:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1080p', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'off', '2021-12-30 00:07:00.000000', NULL, NULL, NULL, 'on', 'on', NULL, NULL, NULL, NULL, 'on', NULL),
(105, 'SuperFan', 'Fan', 'on', NULL, NULL, NULL, 'off', NULL, NULL, NULL, NULL, NULL, '600', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(106, 'testTest', 'Baby monitor', 'on', 'off', '2021-12-16 22:57:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '480p', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'on', '2021-12-16 22:57:00.000000', NULL, NULL, NULL, 'off', 'on', NULL, NULL, NULL, NULL, 'off', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
