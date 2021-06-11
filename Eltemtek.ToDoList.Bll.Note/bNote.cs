using Eltemtek.ToDoList.Dal.Note;
using Eltemtek.ToDoList.Entity.Note.Note;
using System;

namespace Eltemtek.ToDoList.Bll.Note
{
    public class bNote
    {
        public rNote Add(pNote args)
        {
            dNote noteD = new dNote();
            try
            {
                return noteD.Add(args);
            }
            catch (Exception ex)
            {

                return new rNote() { Error = true, Message = ex.Message };
            }
        }

        public rNote Delete(pNote args)
        {
            dNote noteD = new dNote();
            try
            {
                return noteD.Delete(args);
            }
            catch (Exception ex)
            {

                return new rNote() { Error = true, Message = ex.Message };
            }
        }

        public rNote Update(pNote args)
        {
            dNote noteD = new dNote();
            try
            {
                return noteD.Update(args);
            }
            catch (Exception ex)
            {

                return new rNote() { Error = true, Message = ex.Message };
            }
        }

        public rListNote List(pNote args)
        {
            dNote noteD = new dNote();
            try
            {
                return noteD.List(args);
            }
            catch (Exception ex)
            {

                return new rListNote() { Error = true, Message = ex.Message };
            }
        }

        public rNote Get(pNote args)
        {
            dNote noteD = new dNote();
            try
            {
                return noteD.Get(args);
            }
            catch (Exception ex)
            {

                return new rNote() { Error = true, Message = ex.Message };
            }
        }
    }
}
