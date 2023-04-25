namespace api.Database
{
    public class ConnectionString
    {
        public string cs { get; set; }

        public ConnectionString()
        {
        
            string server = "j8oay8teq9xaycnm.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "i56f9r3ay0hysm6t";
            string port = "3306";
            string userName = "rdt2w12unfp1op06";
            string password = "m6fcizor1ztqj50x";

            cs = $@"server={server};user={userName};database={database};port={port};password={password}; default command timeout=0;";
        }
    }
}