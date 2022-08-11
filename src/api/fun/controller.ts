import { Request, Response } from "express";
export const menu = async (req: any, res: Response) => {
  const menu = [
    {
      id: "nc_1660104997461_3971554422",
      href: "/",
      name: "Home",
      isNew: true,
    },
    {
      id: "nc_1660104997461_6849027338",
      href: "#",
      name: "Tours",
      type: "megaMenu",
      megaMenu: [
        {
          id: "nc_1660104997461_4480271283",
          image:
            "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          title: "Company",
          items: [
            { id: "nc_1660104997461_9586828176", href: "#", name: "Katz" },
            {
              id: "nc_1660104997461_7946507095",
              href: "#",
              name: "Livefish",
            },
            {
              id: "nc_1660104997461_444205055",
              href: "#",
              name: "Digitube",
            },
            { id: "nc_1660104997461_4594840656", href: "#", name: "Midel" },
            {
              id: "nc_1660104997461_6496863181",
              href: "#",
              name: "Rhyloo",
            },
            {
              id: "nc_1660104997461_4075781980",
              href: "#",
              name: "Innojam",
            },
          ],
        },
        {
          id: "nc_1660104997461_6676266662",
          image:
            "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          title: "App Name",
          items: [
            {
              id: "nc_1660104997461_2038781598",
              href: "#",
              name: "Tresom",
            },
            {
              id: "nc_1660104997461_6680403005",
              href: "#",
              name: "Hatity",
            },
            { id: "nc_1660104997461_8141047131", href: "#", name: "Otcom" },
            {
              id: "nc_1660104997461_8259259051",
              href: "#",
              name: "Daltfresh",
            },
            {
              id: "nc_1660104997461_3009815579",
              href: "#",
              name: "Duobam",
            },
            {
              id: "nc_1660104997461_2623442249",
              href: "#",
              name: "Mat Lam Tam",
            },
          ],
        },
        {
          id: "nc_1660104997461_5452702667",
          image:
            "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          title: "City",
          items: [
            {
              id: "nc_1660104997461_2718063057",
              href: "#",
              name: "Nezamyslice",
            },
            {
              id: "nc_1660104997461_5770618159",
              href: "#",
              name: "Herzliyya",
            },
            {
              id: "nc_1660104997461_7873441127",
              href: "#",
              name: "Hongqi",
            },
            {
              id: "nc_1660104997461_7483731384",
              href: "#",
              name: "Kamakura",
            },
            {
              id: "nc_1660104997461_7333011391",
              href: "#",
              name: "Yahil’nytsya",
            },
            {
              id: "nc_1660104997461_3056573020",
              href: "#",
              name: "Mandalay",
            },
          ],
        },
        {
          id: "nc_1660104997461_8158374005",
          image:
            "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          title: "Contruction",
          items: [
            {
              id: "nc_1660104997461_3751512760",
              href: "#",
              name: "Plexiglass",
            },
            {
              id: "nc_1660104997461_9098095111",
              href: "#",
              name: "Plexiglass",
            },
            { id: "nc_1660104997461_857599512", href: "#", name: "Stone" },
            {
              id: "nc_1660104997461_2249541005",
              href: "#",
              name: "Granite",
            },
            { id: "nc_1660104997461_8081537346", href: "#", name: "Glass" },
            {
              id: "nc_1660104997461_7524351141",
              href: "#",
              name: "Plexiglass",
            },
          ],
        },
        {
          id: "nc_1660104997461_8696101683",
          image:
            "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          title: "Country",
          items: [
            {
              id: "nc_1660104997461_2982571508",
              href: "#",
              name: "Czech Republic",
            },
            {
              id: "nc_1660104997461_7652303357",
              href: "#",
              name: "Israel",
            },
            { id: "nc_1660104997461_1023443441", href: "#", name: "China" },
            { id: "nc_1660104997461_1196553443", href: "#", name: "Japan" },
            {
              id: "nc_1660104997461_7422684107",
              href: "#",
              name: "Ukraine",
            },
            {
              id: "nc_1660104997461_2993841077",
              href: "#",
              name: "Myanmar",
            },
          ],
        },
      ],
    },
    {
      id: "nc_1660104997461_153115732",
      href: "#",
      name: "Complex",
      type: "dropdown",
      isNew: true,
      children: [
        {
          id: "nc_1660104997461_1868551389",
          href: "/listing-stay",
          name: "Stay listing",
          type: "dropdown",
          children: [
            {
              id: "nc_1660104997461_8921431043",
              href: "/listing-stay",
              name: "Stay page",
            },
            {
              id: "nc_1660104997461_2972738182",
              href: "/listing-stay-map",
              name: "Stay page (map)",
            },
            {
              id: "nc_1660104997461_4740986605",
              href: "/listing-stay-detail",
              name: "Stay Detail",
            },
          ],
        },
        {
          id: "nc_1660104997461_8147107240",
          href: "/listing-experiences",
          name: "Experiences listing",
          type: "dropdown",
          children: [
            {
              id: "nc_1660104997461_8400508754",
              href: "/listing-experiences",
              name: "Experiences page",
            },
            {
              id: "nc_1660104997461_1660927743",
              href: "/listing-experiences-map",
              name: "Experiences page (map)",
            },
            {
              id: "nc_1660104997461_4081654054",
              href: "/listing-experiences-detail",
              name: "Experiences Detail",
            },
          ],
        },
        {
          id: "nc_1660104997461_1379627443",
          href: "/listing-car",
          name: "Cars listing",
          type: "dropdown",
          children: [
            {
              id: "nc_1660104997461_970575008",
              href: "/listing-car",
              name: "Cars page",
            },
            {
              id: "nc_1660104997461_171375572",
              href: "/listing-car-map",
              name: "Cars page (map)",
            },
            {
              id: "nc_1660104997461_2789415548",
              href: "/listing-car-detail",
              name: "Car Detail",
            },
          ],
        },
        {
          id: "nc_1660104997461_9900029591",
          href: "/listing-real-estate",
          name: "Real Estate Listings",
          isNew: true,
          type: "dropdown",
          children: [
            {
              id: "nc_1660104997461_6025678069",
              href: "/listing-real-estate",
              name: "Real Estate Listings",
              isNew: true,
            },
            {
              id: "nc_1660104997461_192245709",
              href: "/listing-real-estate-map",
              name: "Real Estate Maps",
              isNew: true,
            },
          ],
        },
        {
          id: "nc_1660104997461_266302341",
          href: "/listing-flights",
          name: "Flights listing",
          isNew: true,
        },
      ],
    },
    {
      id: "nc_1660104997461_5184986025",
      href: "/event",
      name: "Event",
    },
    {
      id: "nc_1660104997461_9269991437",
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
      id: "nc_1660104997461_9269991439",
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
  return res.status(200).json({
    success: true,
    message: "Амжилттай",
    data: ["ssad", "asdsad"],
  });
};
