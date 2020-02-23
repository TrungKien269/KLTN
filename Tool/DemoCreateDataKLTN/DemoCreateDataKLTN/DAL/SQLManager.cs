using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.DAL
{
    public class SQLManager
    {
        private string strConn = ConfigHelper.GetConfig().GetSection("ConnectionString").Value;

        private SqlConnection connect;
        private SqlCommand com;
        private SqlDataAdapter da;
        private Notification noti;

        public SQLManager()
        {
            connect = new SqlConnection(strConn);
            com = connect.CreateCommand();
        }

        public DataSet ExecuteReader(string strSQL, CommandType ct, params SqlParameter[] param)
        {
            com.CommandText = strSQL;
            com.CommandType = ct;
            com.Parameters.Clear();
            if (param != null)
            {
                foreach (SqlParameter p in param)
                {
                    com.Parameters.Add(p);
                }
            }
            DataSet ds = new DataSet();
            da = new SqlDataAdapter(com);
            da.Fill(ds);
            return ds;
        }

        public Notification ExecuteNonQuery(string strSQL, CommandType ct, params SqlParameter[] param)
        {
            try
            {
                connect.Open();
                com.Parameters.Clear();
                com.CommandText = strSQL;
                com.CommandType = ct;
                if (param != null)
                {
                    foreach (SqlParameter p in param)
                    {
                        com.Parameters.Add(p);
                    }
                }

                int line = com.ExecuteNonQuery();
                noti = new Notification("Success", true, line, null);
            }
            catch (Exception e)
            {
                noti = new Notification(e.Message, false, -1, null);
            }
            finally
            {
                connect.Close();
            }
            return noti;
        }

        public Notification ExecuteScalar(string strSQL, CommandType ct, params SqlParameter[] param)
        {
            try
            {
                connect.Open();
                com.Parameters.Clear();
                com.CommandText = strSQL;
                com.CommandType = ct;
                if (param != null)
                {
                    foreach (SqlParameter p in param)
                    {
                        com.Parameters.Add(p);
                    }
                }

                var obj = com.ExecuteScalar();
                noti = new Notification("Success", true, 1, obj);
            }
            catch (Exception e)
            {
                noti = new Notification(e.Message, false, -1, null);
            }
            finally
            {
                connect.Close();
            }
            return noti;
        }
    }
}
