using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCreateDataKLTN.Models
{
    public class Notification
    {
        public string Message { get; set; }
        public bool Status { get; set; }
        public int? Line { get; set; }
        public object Obj { get; set; }

        public Notification() { }

        public Notification(string message, bool status, int line, object obj)
        {
            this.Line = line;
            this.Message = message;
            this.Status = status;
            this.Obj = obj;
        }
    }
}
