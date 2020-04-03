using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using QRCoder;

namespace BookStoreAPI.Helper
{
    public class QRHelper
    {
        public static void GenerateAndSaveQRCode(string qrText)
        {
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(qrText, QRCodeGenerator.ECCLevel.Q);
            qrCodeData.SaveRawData("QRCodes/file-" + qrText + ".qrr", QRCodeData.Compression.Uncompressed);

            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(15);
            qrCodeImage.Save("QRImages/file-" + qrText + ".png", ImageFormat.Png);
        }

        public static Byte[] BitmapToBytes(Bitmap img)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                img.Save(stream, ImageFormat.Png);
                return stream.ToArray();
            }
        }

        public static Bitmap GetQRFromImage(string orderID)
        {
            var files = Directory.GetFiles("QR/QRImages", "*.png").ToList();
            var file = files.Where(x => Path.GetFileName(x).Equals("file-" + orderID + ".png")).FirstOrDefault();
            Bitmap bmp = (Bitmap)Image.FromFile(file);
            return bmp;
        }

        public static Bitmap GetQRFromCode(string orderID)
        {
            var files = Directory.GetFiles("QR/QRCodes", "*.qrr").ToList();
            var file = files.Where(x => Path.GetFileName(x).Equals("file-" + orderID + ".qrr")).FirstOrDefault();
            QRCodeData qrCodeData = new QRCodeData(file, QRCodeData.Compression.Uncompressed);
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(15);
            return qrCodeImage;
        }

        public static bool CompareImages(Bitmap bmp1, Bitmap bmp2)
        {
            if (bmp1.Size.Equals(bmp2.Size))
            {
                for (int i = 0; i < bmp1.Width; i++)
                {
                    for (int j = 0; j < bmp1.Height; j++)
                    {
                        if (bmp1.GetPixel(i, j) != bmp2.GetPixel(i, j))
                            return false;
                    }
                }
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
