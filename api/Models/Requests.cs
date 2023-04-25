namespace api.Models
{
    public class Requests
    {
        public int car { get; set; }
        public string fNameInput { get; set; }
        public string lNameInput { get; set; }
        public string email { get; set; }
        // public string? carName { get; set; }
        public DateTime expDate { get; set; }

        static public int count { get; set; }
        public Requests()
        {

        }
        public override string ToString()
        {
            return $"First Name: {fNameInput}, Last Name: {lNameInput}, Email: {email}, Expiration Date: {expDate.ToString("MM/dd/yyyy")}";
        }

    }
}