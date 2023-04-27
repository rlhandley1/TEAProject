namespace api.Models
{
    public class Requests
    {
        public int car { get; set; }
        public string fName { get; set; }
        public string lName { get; set; }
        public string email { get; set; }
        // public string? carName { get; set; }
        // public DateTime expDate { get; set; }

        static public int count { get; set; }
        public Requests()
        {

        }
        public override string ToString()
        {
            return $"First Name: {fName}, Last Name: {lName}, Email: {email}";
        }

    }
}