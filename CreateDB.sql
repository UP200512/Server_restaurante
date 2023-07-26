-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2023 a las 07:19:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `new_bar_pen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_de_pedidos`
--

CREATE TABLE `detalle_de_pedidos` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 0,
  `precio_unitario` decimal(10,2) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_de_pedidos`
--

INSERT INTO `detalle_de_pedidos` (`id_detalle`, `id_pedido`, `id_producto`, `cantidad`, `precio_unitario`, `fecha`) VALUES
(1, 4, 2, 1, 60.00, '2023-07-25 16:20:20'),
(2, 4, 9, 1, 14.00, '2023-07-25 16:20:20'),
(3, 4, 3, 1, 70.00, '2023-07-25 16:20:20'),
(4, 4, 1, 1, 55.00, '2023-07-25 16:20:54'),
(5, 4, 2, 1, 60.00, '2023-07-25 16:20:54'),
(6, 4, 1, 1, 55.00, '2023-07-25 16:22:44'),
(7, 4, 2, 1, 60.00, '2023-07-25 16:22:44'),
(8, 4, 2, 1, 60.00, '2023-07-25 16:26:58'),
(9, 4, 3, 1, 70.00, '2023-07-25 16:26:58'),
(10, 4, 2, 1, 60.00, '2023-07-25 16:27:26'),
(11, 4, 1, 1, 55.00, '2023-07-25 16:27:26'),
(12, 4, 1, 1, 55.00, '2023-07-25 16:28:07'),
(13, 4, 2, 1, 60.00, '2023-07-25 16:28:07'),
(1, 3, 1, 1, 55.00, '2023-07-26 01:27:45'),
(2, 3, 2, 1, 60.00, '2023-07-26 01:27:45'),
(3, 3, 3, 14, 70.00, '2023-07-26 01:49:20'),
(4, 3, 1, 3, 55.00, '2023-07-26 01:51:19'),
(5, 3, 3, 4, 70.00, '2023-07-26 01:51:19'),
(6, 3, 8, 1, 654.00, '2023-07-26 01:51:19'),
(7, 3, 9, 1, 14.00, '2023-07-26 01:51:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_de_productos`
--

CREATE TABLE `detalle_de_productos` (
  `id_detalle` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_insumo` int(11) NOT NULL,
  `cantidad` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_de_productos`
--

INSERT INTO `detalle_de_productos` (`id_detalle`, `id_producto`, `id_insumo`, `cantidad`) VALUES
(3, 3, 2, 15.00),
(4, 3, 3, 9.00),
(8, 3, 3, 6991.00),
(9, 3, 2, 47.00),
(10, 1, 5, 5.00),
(11, 12, 5, 75.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `id_insumo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo_insumo_id` int(11) NOT NULL,
  `unidad_de_medida_id` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumos`
--

INSERT INTO `insumos` (`id_insumo`, `nombre`, `tipo_insumo_id`, `unidad_de_medida_id`, `descripcion`, `cantidad`) VALUES
(2, 'totopos7', 1, 1, 'tortillas fritas xdlol', 48),
(3, 'salsa', 1, 1, 'salsa roja', 4),
(5, 'Sal', 1, 1, 'Salesita', 78),
(13, 'Pimienta', 1, 1, 'Pimienta negra recien molida', 80);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `mesa` int(11) NOT NULL DEFAULT 0,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `fecha`, `total`, `mesa`, `activo`) VALUES
(1, '0000-00-00', 70.00, 0, 1),
(2, '0000-00-00', 824.00, 2, 1),
(3, '0000-00-00', 2378.00, 2, 1),
(4, '0000-00-00', 1798.00, 55, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_en_venta`
--

CREATE TABLE `productos_en_venta` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `id_tipo_prod` int(11) DEFAULT NULL,
  `prioridad` int(11) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_en_venta`
--

INSERT INTO `productos_en_venta` (`id_producto`, `nombre`, `descripcion`, `precio`, `id_tipo_prod`, `prioridad`, `imagen`) VALUES
(1, 'Chilaquiles', 'chilaquiles con queso', 55.00, 1, 2, NULL),
(2, 'enmoladas', 'tortilla con mole poblano ', 60.00, 2, 1, NULL),
(3, 'hamburguesaXD', 'hamburguesa sencilla XD', 70.00, 1, 2, NULL),
(8, 'Tacos de pastor', 'Este es el producto con la prioridad más alta de todos, está muy rico, deberían probarlo mmmmmm que delicia', 654.00, 1, 3, NULL),
(9, 'hot dog', 'hot dog con salchicha sabor a pavo', 14.00, 1, 2, NULL),
(11, 'salchichon', 'salchicha de pavo y cerdo con salsa', 45.00, 2, 1, NULL),
(12, 'Papas', 'papas con queso', 75.00, 1, 1, NULL),
(13, 'Doritos', 'mfhgcnhgkgh', 78.00, 2, 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_de_insumo`
--

CREATE TABLE `tipos_de_insumo` (
  `id_tipo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_de_insumo`
--

INSERT INTO `tipos_de_insumo` (`id_tipo`, `nombre`) VALUES
(1, 'Liquido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_de_usuarios`
--

CREATE TABLE `tipos_de_usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_de_producto`
--

CREATE TABLE `tipo_de_producto` (
  `id_tipo_prod` int(11) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_de_producto`
--

INSERT INTO `tipo_de_producto` (`id_tipo_prod`, `nombre`) VALUES
(1, 'desayuno'),
(2, 'embutidos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades_de_medida`
--

CREATE TABLE `unidades_de_medida` (
  `id_unidad` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `abreviacion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidades_de_medida`
--

INSERT INTO `unidades_de_medida` (`id_unidad`, `nombre`, `abreviacion`) VALUES
(1, 'Gramos', 'gr');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(75) NOT NULL,
  `clave` varchar(250) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tipo` int(11) DEFAULT 0,
  `alterado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_de_pedidos`
--
ALTER TABLE `detalle_de_pedidos`
  ADD KEY `id_detalle` (`id_detalle`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `detalle_de_productos`
--
ALTER TABLE `detalle_de_productos`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_insumo` (`id_insumo`);

--
-- Indices de la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD PRIMARY KEY (`id_insumo`),
  ADD KEY `tipo_insumo_id` (`tipo_insumo_id`),
  ADD KEY `unidad_de_medida_id` (`unidad_de_medida_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `productos_en_venta`
--
ALTER TABLE `productos_en_venta`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `fk_tipo_prod` (`id_tipo_prod`);

--
-- Indices de la tabla `tipos_de_insumo`
--
ALTER TABLE `tipos_de_insumo`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `tipos_de_usuarios`
--
ALTER TABLE `tipos_de_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_de_producto`
--
ALTER TABLE `tipo_de_producto`
  ADD PRIMARY KEY (`id_tipo_prod`);

--
-- Indices de la tabla `unidades_de_medida`
--
ALTER TABLE `unidades_de_medida`
  ADD PRIMARY KEY (`id_unidad`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo` (`tipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_de_productos`
--
ALTER TABLE `detalle_de_productos`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `insumos`
--
ALTER TABLE `insumos`
  MODIFY `id_insumo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos_en_venta`
--
ALTER TABLE `productos_en_venta`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tipos_de_insumo`
--
ALTER TABLE `tipos_de_insumo`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipos_de_usuarios`
--
ALTER TABLE `tipos_de_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_de_producto`
--
ALTER TABLE `tipo_de_producto`
  MODIFY `id_tipo_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `unidades_de_medida`
--
ALTER TABLE `unidades_de_medida`
  MODIFY `id_unidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_de_pedidos`
--
ALTER TABLE `detalle_de_pedidos`
  ADD CONSTRAINT `detalle_de_pedidos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  ADD CONSTRAINT `detalle_de_pedidos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos_en_venta` (`id_producto`);

--
-- Filtros para la tabla `detalle_de_productos`
--
ALTER TABLE `detalle_de_productos`
  ADD CONSTRAINT `detalle_de_productos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos_en_venta` (`id_producto`);

--
-- Filtros para la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD CONSTRAINT `insumos_ibfk_1` FOREIGN KEY (`tipo_insumo_id`) REFERENCES `tipos_de_insumo` (`id_tipo`),
  ADD CONSTRAINT `insumos_ibfk_2` FOREIGN KEY (`unidad_de_medida_id`) REFERENCES `unidades_de_medida` (`id_unidad`);

--
-- Filtros para la tabla `productos_en_venta`
--
ALTER TABLE `productos_en_venta`
  ADD CONSTRAINT `fk_tipo_prod` FOREIGN KEY (`id_tipo_prod`) REFERENCES `tipo_de_producto` (`id_tipo_prod`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `tipos_de_usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
