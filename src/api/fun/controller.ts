import { Request, Response } from "express";
import {
  service_find_where as category_service_find,
  service_find,
} from "../services/category/service";
import { service_find_where as complex_service_find } from "../services/complex/service";
export const menu = async (req: any, res: Response) => {
  const category = await category_service_find({}, {});
  const complex = await complex_service_find({}, {});

  const menu = [
    {
      id: "",
      href: "",
      name: "Home",
      isNew: true,
    },
    {
      id: "",
      href: "#",
      name: "Tours",
      type: "megaMenu",
      megaMenu: [...category],
    },
    {
      id: "",
      href: "#",
      name: "Complex",
      type: "dropdown",
      isNew: true,
      children: [...complex],
    },
    // {
    //   id: "",
    //   href: "/event",
    //   name: "Event",
    // },
    {
      id: "",
      href: "#",
      name: "News, Blog",
      type: "dropdown",
      children: [
        {
          id: 1,
          href: "/news",
          name: "Мэдээ",
        },
        {
          id: 1,
          href: "/blog",
          name: "Блог",
        },
      ],
    },
    {
      id: "",
      href: "/about",
      name: "About",
    },
  ];
  return res.status(200).json({
    success: true,
    message: "Амжилттай",
    data: { first_language: menu, second_language: menu },
  });
};
export const location = async (req: any, res: Response) => {
  const category = await service_find({}, {});
  let data: any = [];
  await category.forEach(async (el: any) => {
    await data.push(el.name);
  });
  return res.status(200).json({
    success: true,
    message: "Амжилттай",
    data: data,
  });
};
