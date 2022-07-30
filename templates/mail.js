class html {
  forgot(data) {
    return `
    <div style="font-family:Arial,Helvetica,sans-serif; line-height: 1.5; font-weight: normal; font-size: 15px; color: #2F3044; min-height: 100%; margin:0; padding:0; width:100%; background-color:#edf2f7">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 auto; padding:0; max-width:600px">
    <tbody>
      <tr>
        <td align="center" valign="center" style="text-align:center; padding: 40px">
          <a href="https://monga.one" rel="noopener" target="_blank">
            <img alt="Logo" src="https://www.monga.one/img/logo_dark.0118958d.png" width="200px" />
          </a>
        </td>
      </tr>
      <tr>
        <td align="left" valign="center">
          <div style="text-align:left; margin: 0 20px; padding: 40px; background-color:#ffffff; border-radius: 6px">
            <!--begin:Email content-->
            <div style="padding-bottom: 30px; font-size: 17px;">
              <strong>Сайн байна уу ${data.user_name}</strong>
            </div>
            <div style="padding-bottom: 30px">${"Та Monga бүртгэлийнхээ нууц үгийг шинэчлэх хүсэлт илгээсэн байна. Таны баталгаажуулах код:"}</div>
            <div style="padding-bottom: 40px; text-align:center;">
              <code style="text-decoration:none;display:inline-block;text-align:center;padding:0.75575rem 1.3rem;font-size:0.925rem;line-height:1.5;border-radius:0.35rem;color:#ffffff;background-color:#009ef7;border:0px;margin-right:0.75rem!important;font-weight:600!important;outline:none!important;vertical-align:middle">${
                data.code
              }</code>
            </div>
            <div style="padding-bottom: 30px">${""}</div>
            <div style="border-bottom: 1px solid #eeeeee; margin: 15px 0"></div>
            <!--end:Email content-->
            <div style="padding-bottom: 10px">Хүндэтгэсэн, <br>
              Monga

      <tr>
        <td align="center" valign="center" style="font-size: 13px; text-align:center;padding: 20px; color: #6d6e7c;">
          <p>${""}</p>
          <p>Copyright ©
            <a href="https://Monga.mn" rel="noopener" target="_blank">Monga</a>.
          </p>
        </td>
      </tr></br>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
  `;
  }
  validation_mail(data) {
    return `
    <div style="font-family:Arial,Helvetica,sans-serif; line-height: 1.5; font-weight: normal; font-size: 15px; color: #2F3044; min-height: 100%; margin:0; padding:0; width:100%; background-color:#edf2f7">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 auto; padding:0; max-width:600px">
    <tbody>
      <tr>
        <td align="center" valign="center" style="text-align:center; padding: 40px">
          <a href="https://forms.mn" rel="noopener" target="_blank">
            <img alt="Logo" src="https://api.forms.mn/upload/logo_color.png" width="200px" />
          </a>
        </td>
      </tr>
      <tr>
        <td align="left" valign="center">
          <div style="text-align:left; margin: 0 20px; padding: 40px; background-color:#ffffff; border-radius: 6px">
            <!--begin:Email content-->
            <div style="padding-bottom: 30px; font-size: 17px;">
              <strong>Сайн байна уу ${data.user_name}</strong>
            </div>
            <div style="padding-bottom: 30px">${"Та доорх холбоосыг дарж бүртгэлээ идэвхжүүлээрэй."}</div>
            <div style="padding-bottom: 40px; text-align:center;">
              <a href="${
                data.code
              }" style="text-decoration:none;display:inline-block;text-align:center;padding:0.75575rem 1.3rem;font-size:0.925rem;line-height:1.5;border-radius:0.35rem;color:#ffffff;background-color:#009ef7;border:0px;margin-right:0.75rem!important;font-weight:600!important;outline:none!important;vertical-align:middle">Бүртгэл идэвхжүүлэх</a>
            </div>
            <div style="padding-bottom: 30px">${"Дээрх баталгаажуулалт боломжгүй тохиолдолд доорх холбоос руу орж баталгаажуулна уу:"}<br>${
      data.code
    }</div>
            <div style="border-bottom: 1px solid #eeeeee; margin: 15px 0"></div>
            <!--end:Email content-->
            <div style="padding-bottom: 10px">Хүндэтгэсэн, <br>
              Forms.mn

      <tr>
        <td align="center" valign="center" style="font-size: 13px; text-align:center;padding: 20px; color: #6d6e7c;">
          <p>${""}</p>
          <p>Copyright ©
            <a href="https://forms.mn" rel="noopener" target="_blank">Forms.mn</a>.
          </p>
        </td>
      </tr></br>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
  `;
  }
}
module.exports = new html();
