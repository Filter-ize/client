import { FaTh, FaRegChartBar, FaCommentAlt, FaRedhat } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';

const menu = [
    {
      title: "Panel",
      icon: <FaTh />,
      path: "/dashboard",
    },
    {
      title: "Crear Empleado",
      icon: <BiImageAdd />,
      path: "/add-employee",
    },
    {
      title: "Cuenta",
      icon: <FaRegChartBar />,
      childrens: [
        {
          title: "Perfil",
          path: "/profile",
        },
        {
          title: "Editar Perfil",
          path: "/edit-profile",
        },
      ],
    },
    {
      title: "Procesos",
      icon: <FaRedhat />,
      path: "/processes",
    },
    {
      title: "Reportar Problema",
      icon: <FaCommentAlt />,
      path: "/contact-us",
    },
  ];
export default menu;