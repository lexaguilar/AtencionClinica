using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AtencionClinica.Models;

namespace AtencionClinica.Factory
{  
    public class GenericFactory<T> where T : class
    {      
         private ClinicaContext db = null;
        private DbSet<T> entity = null;

        public GenericFactory()
        {
            this.db = new ClinicaContext();
            entity = db.Set<T>();
        }

        public GenericFactory(ClinicaContext _db)
        {
            this.db = _db;
            entity = db.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return entity.ToArray();
        }

        public IEnumerable<T> GetAll(Expression<Func<T, bool>> predicate)
        {
            return entity.Where(predicate).AsNoTracking().ToArray();
        }

        public T GetById(int id)
        {
            return entity.Find(id);
        }

        public T FirstOrDefault()
        {
            return entity.FirstOrDefault();
        }

        public T FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            return entity.FirstOrDefault(predicate);
        }

        public void Insert(T obj)
        {
            entity.Add(obj);
        }

        public void InsertRange(IEnumerable<T> obj)
        {
            foreach(var t in obj){
                this.Insert(t);
            }
        }

        public void Update(T obj)
        {
            entity.Attach(obj);
            db.Entry(obj).State = EntityState.Modified;
        }

        public void UpdateRange(IEnumerable<T> obj)
        {
            foreach(var t in obj){
                this.Update(t);
            }
        }

        public void InsertOrUpdate(T obj, Expression<Func<T, bool>> predicate){
            if(Exists(predicate))
                Update(obj);
            else
                Insert(obj);
        }

         public int InsertOrUpdateAndSave(T obj,Expression<Func<T, bool>> predicate){
             
            InsertOrUpdate(obj, predicate);
            return Save();
        }

        public void Delete(int id)
        {
            T existing = entity.Find(id);
            entity.Remove(existing);
        }

        public void Delete(T obj)
        {
            entity.Remove(obj);
        }

        public int Save()
        {
            return db.SaveChanges();
        }

        public int DeleteAndSave(int id)
        {
            T existing = entity.Find(id);
            entity.Remove(existing);
            return db.SaveChanges();
        }

        public bool Exists(Expression<Func<T, bool>> predicate){
            return entity.Any(predicate);
        }
    }
}