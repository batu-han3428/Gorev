namespace Common.DTO
{
    public class TaskDTO
    {
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Priority { get; set; }
        public bool Urgency { get; set; }
        public int Constituent { get; set; }
        public DateTime CompletionTime { get; set; }
        public List<DocumentDTO> documentDTOs { get; set; }
    }
}
