﻿using System.Net;
using System.Net.Mail;

namespace Common.Helpers
{
    public class EmailHelper
    {
        public bool SendEmail(string email, string message, string senderMail, string senderPassword, string subject, string documentName = null, byte[] documentByte = null)
        {
            #region MailMessage
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("bticaret01@gmail.com");
            mailMessage.To.Add(email);
            mailMessage.Subject = subject;
            mailMessage.Body = message;
            mailMessage.IsBodyHtml = true;
            if(documentByte != null)
            {
                Attachment attachment;
                attachment = new Attachment(new MemoryStream(documentByte), documentName);
                mailMessage.Attachments.Add(attachment);
            }
            #endregion

            #region SmtpSettings
            SmtpClient client = new SmtpClient();
            client.Credentials = new NetworkCredential(senderMail, senderPassword);
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            #endregion

            try
            {
                client.Send(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return false;
        }
    }
}
