const { create, show_table } = require("./service");
const mysql = require("../../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");

const blog_news = [
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
];

module.exports = {
  menu_1: async (req, res) => {
    lang = req.get("Accept-Language");
    if (lang == "en") {
      let response = mysql.QUERY(
        "SELECT id,title_en as 'title',image  FROM cat_tour",
        []
      );
      if (!response.success) {
        return res.status(200).json({
          success: false,
          message: "Query error",
        });
      }
      let megaMenuDemo = [];
      await response.data.forEach(async (el) => {
        let res = await mysql.QUERY(
          "SELECT id,name_en as 'name',href FROM tour where cat_id=?",
          [el.id]
        );
        el.items = res.data;
        await megaMenuDemo.push(el);
      });
      let complexs = mysql.QUERY(
        "SELECT id,name_en as 'name',href FROM complex",
        []
      );
      let menu = [
        {
          id: 1,
          href: "/",
          name: "Home",
          isNew: true,
        },
        {
          id: 1,
          href: "#",
          name: "Tours",
          type: "megaMenu",
          megaMenu: megaMenuDemo,
        },
        {
          id: 2,
          href: "#",
          name: "Complex",
          type: "dropdown",
          children: complexs.data,
        },
        {
          id: 4,
          href: "/event",
          name: "Event",
          isNew: true,
        },
        {
          id: 5,
          href: "#",
          name: "News, Blog",
          type: "dropdown",
          children: blog_news,
        },
        {
          id: 6,
          href: "/about",
          name: "About",
          isNew: true,
        },
      ];
      return res.status(200).json({
        success: true,
        data: menu,
      });
    } else {
      response = mysql.QUERY(
        "SELECT id,title,title_en,image  FROM cat_tour",
        []
      );
      if (!response.success) {
        return res.status(200).json({
          success: false,
          message: "Query error",
        });
      }
      megaMenuDemo = [];
      await response.data.forEach(async (el) => {
        let res = await mysql.QUERY("SELECT * FROM tour where cat_id=?", [
          el.id,
        ]);
        el.items = res.data;
        await megaMenuDemo.push(el);
      });
      complexs = mysql.QUERY("SELECT id, name ,href FROM complex ", []);
      menu = [
        {
          id: 1,
          href: "/",
          name: "Нүүр",
          isNew: true,
        },
        {
          id: 1,
          href: "#",
          name: "Аялалууд",
          type: "megaMenu",
          megaMenu: megaMenuDemo,
        },
        {
          id: 2,
          href: "#",
          name: "Цогцолбор",
          type: "dropdown",
          children: complexs.data,
        },
        {
          id: 4,
          href: "/event",
          name: "Үйл ажиллагаа",
          isNew: true,
        },
        {
          id: 5,
          href: "#",
          name: "Мэдээ, блог",
          type: "dropdown",
          children: blog_news,
        },
        {
          id: 6,
          href: "/about",
          name: "Тухай",
          isNew: true,
        },
      ];
      return res.status(200).json({
        success: true,
        data: menu,
      });
    }
  },
};
